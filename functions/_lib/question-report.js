const MAX_REQUEST_BYTES = 16_384;
const MAX_NOTE_LENGTH = 1_000;
const MAX_URL_LENGTH = 800;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_ACTION = "question_report";

export const REPORT_CATEGORIES = Object.freeze([
  "possible_typo",
  "correct_answer_may_be_wrong",
  "explanation_unclear",
  "question_outdated",
  "duplicate_question",
  "other",
]);

const REPORT_CATEGORY_SET = new Set(REPORT_CATEGORIES);

export class ReportRequestError extends Error {
  constructor(message, { status = 400, code = "invalid_request" } = {}) {
    super(message);
    this.name = "ReportRequestError";
    this.status = status;
    this.code = code;
  }
}

function cleanString(value, { field, required = true, maxLength = 200 } = {}) {
  if (typeof value !== "string") {
    if (!required && (value === null || value === undefined)) {
      return "";
    }
    throw new ReportRequestError(`${field} must be text.`, { code: `invalid_${field}` });
  }

  const cleaned = value.trim();

  if (required && !cleaned) {
    throw new ReportRequestError(`${field} is required.`, { code: `missing_${field}` });
  }

  if (cleaned.length > maxLength) {
    throw new ReportRequestError(`${field} is too long.`, { code: `invalid_${field}` });
  }

  return cleaned;
}

function cleanInteger(value, { field, minimum = 1, maximum = 10_000, required = true } = {}) {
  if (!required && (value === null || value === undefined || value === "")) {
    return null;
  }

  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new ReportRequestError(`${field} is invalid.`, { code: `invalid_${field}` });
  }

  return value;
}

function cleanAnswerIds(value, { field, questionId, required = true } = {}) {
  if (!Array.isArray(value)) {
    throw new ReportRequestError(`${field} must be a list.`, { code: `invalid_${field}` });
  }

  if (required && value.length === 0) {
    throw new ReportRequestError(`${field} cannot be empty.`, { code: `invalid_${field}` });
  }

  if (value.length > 12) {
    throw new ReportRequestError(`${field} contains too many answers.`, { code: `invalid_${field}` });
  }

  const cleaned = value.map((item) => cleanString(item, {
    field,
    maxLength: 100,
  }));

  if (new Set(cleaned).size !== cleaned.length) {
    throw new ReportRequestError(`${field} contains duplicate answers.`, { code: `invalid_${field}` });
  }

  if (!cleaned.every((answerId) => answerId.startsWith(`${questionId}:`))) {
    throw new ReportRequestError(`${field} does not match the reported question.`, { code: `invalid_${field}` });
  }

  return cleaned;
}

export function normalizeQuestionReportPayload(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new ReportRequestError("The report body must be a JSON object.");
  }

  const questionId = cleanString(input.questionId, { field: "questionId", maxLength: 64 });
  const testId = cleanString(input.testId, { field: "testId", maxLength: 48 });
  const examVersion = cleanString(input.examVersion, { field: "examVersion", maxLength: 48 });
  const dataVersion = cleanString(input.dataVersion, { field: "dataVersion", maxLength: 160 });
  const category = cleanString(input.category, { field: "category", maxLength: 64 });
  const note = cleanString(input.note ?? "", {
    field: "note",
    required: false,
    maxLength: MAX_NOTE_LENGTH,
  });
  const turnstileToken = cleanString(input.turnstileToken, {
    field: "turnstileToken",
    maxLength: 2_048,
  });
  const honeypot = cleanString(input.website ?? "", {
    field: "website",
    required: false,
    maxLength: 200,
  });

  if (!/^[A-Z0-9][A-Z0-9-]{2,63}$/.test(questionId)) {
    throw new ReportRequestError("questionId has an invalid format.", { code: "invalid_questionId" });
  }

  if (!/^[A-Z0-9][A-Z0-9-]{1,47}$/.test(testId)) {
    throw new ReportRequestError("testId has an invalid format.", { code: "invalid_testId" });
  }

  if (!REPORT_CATEGORY_SET.has(category)) {
    throw new ReportRequestError("The report category is not supported.", { code: "invalid_category" });
  }

  if (category === "other" && !note) {
    throw new ReportRequestError("A note is required for an Other report.", { code: "missing_note" });
  }

  const displayedAnswerIds = cleanAnswerIds(input.displayedAnswerIds, {
    field: "displayedAnswerIds",
    questionId,
  });
  const selectedAnswerIds = cleanAnswerIds(input.selectedAnswerIds ?? [], {
    field: "selectedAnswerIds",
    questionId,
    required: false,
  });

  const displayedSet = new Set(displayedAnswerIds);
  if (!selectedAnswerIds.every((answerId) => displayedSet.has(answerId))) {
    throw new ReportRequestError("A selected answer was not displayed for this question.", {
      code: "invalid_selectedAnswerIds",
    });
  }

  return {
    questionId,
    testId,
    examVersion,
    questionVersion: cleanInteger(input.questionVersion, {
      field: "questionVersion",
      minimum: 1,
      maximum: 99_999,
      required: false,
    }),
    dataVersion,
    category,
    note,
    questionPosition: cleanInteger(input.questionPosition, {
      field: "questionPosition",
      minimum: 1,
      maximum: 500,
    }),
    displayedAnswerIds,
    selectedAnswerIds,
    turnstileToken,
    honeypot,
  };
}

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function requestOriginMatches(request) {
  const origin = request.headers.get("Origin");
  if (!origin) {
    return true;
  }

  return origin === new URL(request.url).origin;
}

function safeReferrer(request) {
  const referrer = request.headers.get("Referer");
  if (!referrer) {
    return "";
  }

  try {
    const parsed = new URL(referrer);
    if (parsed.origin !== new URL(request.url).origin) {
      return "";
    }
    return parsed.href.slice(0, MAX_URL_LENGTH);
  } catch {
    return "";
  }
}

export async function verifyTurnstile({
  token,
  secretKey,
  remoteIp = "",
  fetchImpl = fetch,
}) {
  if (!secretKey) {
    throw new ReportRequestError("Question reporting is not configured.", {
      status: 503,
      code: "reporting_not_configured",
    });
  }

  const formData = new FormData();
  formData.set("secret", secretKey);
  formData.set("response", token);
  if (remoteIp) {
    formData.set("remoteip", remoteIp);
  }

  let response;
  try {
    response = await fetchImpl(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new ReportRequestError("Verification service is temporarily unavailable.", {
      status: 502,
      code: "verification_unavailable",
    });
  }

  if (!response.ok) {
    throw new ReportRequestError("Verification service is temporarily unavailable.", {
      status: 502,
      code: "verification_unavailable",
    });
  }

  const result = await response.json();

  if (!result.success || (result.action && result.action !== TURNSTILE_ACTION)) {
    throw new ReportRequestError("Verification expired or was unsuccessful. Please try again.", {
      status: 400,
      code: "verification_failed",
    });
  }

  return result;
}

export async function insertQuestionReport({
  db,
  report,
  pageUrl,
  now = () => new Date().toISOString(),
  createId = () => crypto.randomUUID(),
}) {
  if (!db?.prepare) {
    throw new ReportRequestError("Question reporting is not configured.", {
      status: 503,
      code: "reporting_not_configured",
    });
  }

  const reportId = createId();
  const submittedAt = now();

  try {
    await db.prepare(`
      INSERT INTO question_reports (
        report_id,
        submitted_at,
        question_id,
        test_id,
        exam_version,
        question_version,
        data_version,
        report_category,
        note,
        question_position,
        displayed_answer_ids_json,
        selected_answer_ids_json,
        page_url,
        review_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `).bind(
      reportId,
      submittedAt,
      report.questionId,
      report.testId,
      report.examVersion,
      report.questionVersion,
      report.dataVersion,
      report.category,
      report.note || null,
      report.questionPosition,
      JSON.stringify(report.displayedAnswerIds),
      JSON.stringify(report.selectedAnswerIds),
      pageUrl || null,
    ).run();
  } catch (error) {
    console.error("Question report database insert failed.", error);
    throw new ReportRequestError("The report could not be saved right now. Please try again later.", {
      status: 503,
      code: "report_storage_unavailable",
    });
  }

  return { reportId, submittedAt };
}

export async function handleQuestionReportRequest(context, options = {}) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed." }, 405, {
      Allow: "POST",
    });
  }

  if (!requestOriginMatches(request)) {
    return jsonResponse({ ok: false, error: "Request origin was rejected." }, 403);
  }

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonResponse({ ok: false, error: "JSON content is required." }, 415);
  }

  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ ok: false, error: "The report is too large." }, 413);
  }

  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      throw new ReportRequestError("The report is too large.", {
        status: 413,
        code: "request_too_large",
      });
    }

    let input;
    try {
      input = JSON.parse(rawBody);
    } catch {
      throw new ReportRequestError("The report body is not valid JSON.", {
        code: "invalid_json",
      });
    }

    const report = normalizeQuestionReportPayload(input);

    if (report.honeypot) {
      return jsonResponse({ ok: true, reportId: "accepted" }, 201);
    }

    await verifyTurnstile({
      token: report.turnstileToken,
      secretKey: env?.TURNSTILE_SECRET_KEY,
      remoteIp: request.headers.get("CF-Connecting-IP") || "",
      fetchImpl: options.fetchImpl,
    });

    const saved = await insertQuestionReport({
      db: env?.REPORTS_DB,
      report,
      pageUrl: safeReferrer(request),
      now: options.now,
      createId: options.createId,
    });

    return jsonResponse({
      ok: true,
      reportId: saved.reportId,
      submittedAt: saved.submittedAt,
    }, 201);
  } catch (error) {
    if (error instanceof ReportRequestError) {
      return jsonResponse({
        ok: false,
        code: error.code,
        error: error.message,
      }, error.status);
    }

    console.error("Unexpected question report error.", error);
    return jsonResponse({
      ok: false,
      code: "unexpected_error",
      error: "The report could not be saved right now. Please try again later.",
    }, 500);
  }
}

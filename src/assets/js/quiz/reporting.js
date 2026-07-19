export const REPORT_CATEGORY_OPTIONS = Object.freeze([
  ["possible_typo", "Possible typo"],
  ["correct_answer_may_be_wrong", "Correct answer may be wrong"],
  ["explanation_unclear", "Explanation is unclear"],
  ["question_outdated", "Question may be outdated"],
  ["duplicate_question", "Duplicate question"],
  ["other", "Other"],
]);

const TURNSTILE_SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let turnstileScriptPromise = null;

export function buildQuestionReportPayload({
  session,
  questionId,
  questionPosition,
  category,
  note = "",
  turnstileToken,
  website = "",
}) {
  const state = session?.questions?.[questionId];

  if (!state?.question) {
    throw new Error("The reported question is not part of this session.");
  }

  return {
    questionId,
    testId: session.test.testId,
    examVersion: session.test.examVersion,
    questionVersion: state.question.version ?? null,
    dataVersion: session.dataVersion,
    category,
    note: String(note).trim(),
    questionPosition,
    displayedAnswerIds: [...state.displayedAnswerIds],
    selectedAnswerIds: [...state.selectedAnswerIds],
    turnstileToken,
    website,
  };
}

export async function submitQuestionReport(payload, {
  endpoint = "/api/question-report",
  fetchImpl = fetch,
} = {}) {
  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok || !body?.ok) {
    const error = new Error(body?.error || "The report could not be submitted. Please try again.");
    error.code = body?.code || "report_failed";
    error.status = response.status;
    throw error;
  }

  return body;
}

function loadTurnstileScript() {
  if (globalThis.turnstile) {
    return Promise.resolve(globalThis.turnstile);
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${TURNSTILE_SCRIPT_URL}"]`);
    const script = existing || document.createElement("script");

    const finish = () => {
      if (globalThis.turnstile) {
        resolve(globalThis.turnstile);
      } else {
        reject(new Error("Verification could not be loaded."));
      }
    };

    script.addEventListener("load", finish, { once: true });
    script.addEventListener("error", () => reject(new Error("Verification could not be loaded.")), { once: true });

    if (!existing) {
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      document.head.append(script);
    }
  });

  return turnstileScriptPromise;
}

export function createQuestionReporter({
  root,
  getSession,
  announce = () => {},
  endpoint = "/api/question-report",
}) {
  const dialog = root.querySelector("[data-report-dialog]");
  const form = root.querySelector("[data-report-form]");
  const questionIdOutput = root.querySelector("[data-report-question-id]");
  const status = root.querySelector("[data-report-status]");
  const submitButton = root.querySelector("[data-report-submit]");
  const closeButtons = [...root.querySelectorAll("[data-report-close]")];
  const turnstileContainer = root.querySelector("[data-report-turnstile]");
  const siteKey = root.dataset.turnstileSiteKey || "";

  if (!dialog || !form || !questionIdOutput || !status || !submitButton || !turnstileContainer) {
    throw new Error("The question report interface is incomplete.");
  }

  let reportContext = null;
  let turnstileApi = null;
  let widgetId = null;
  let turnstileToken = "";
  let lastOpener = null;

  const setStatus = (message, type = "") => {
    status.textContent = message;
    status.dataset.statusType = type;
  };

  const setSubmitting = (submitting) => {
    submitButton.disabled = submitting || !siteKey || !turnstileToken;
    submitButton.textContent = submitting ? "Submitting…" : "Submit report";
  };

  const resetTurnstile = () => {
    turnstileToken = "";
    if (turnstileApi && widgetId !== null) {
      turnstileApi.reset(widgetId);
    }
  };

  const prepareTurnstile = async () => {
    if (!siteKey) {
      setStatus("Question reporting is not configured yet.", "error");
      submitButton.disabled = true;
      return;
    }

    setStatus("Loading verification…");

    try {
      turnstileApi = await loadTurnstileScript();

      if (widgetId === null) {
        widgetId = turnstileApi.render(turnstileContainer, {
          sitekey: siteKey,
          theme: "dark",
          size: "flexible",
          action: "question_report",
          callback(token) {
            turnstileToken = token;
            setStatus("Verification complete.", "success");
            setSubmitting(false);
          },
          "expired-callback"() {
            turnstileToken = "";
            setStatus("Verification expired. Please verify again.", "error");
          },
          "error-callback"() {
            turnstileToken = "";
            setStatus("Verification could not be completed. Please try again.", "error");
          },
        });
      } else {
        resetTurnstile();
      }
    } catch (error) {
      console.error(error);
      setStatus("Verification could not be loaded. Check content blockers and try again.", "error");
      submitButton.disabled = true;
    }
  };

  const closeDialog = () => {
    if (dialog.open) {
      dialog.close();
    }
  };

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeDialog);
  });

  dialog.addEventListener("cancel", () => {
    reportContext = null;
  });

  dialog.addEventListener("close", () => {
    reportContext = null;
    form.reset();
    setStatus("");
    resetTurnstile();
    setSubmitting(false);
    lastOpener?.focus?.();
    lastOpener = null;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!reportContext) {
      return;
    }

    const formData = new FormData(form);
    const category = String(formData.get("report-category") || "");
    const note = String(formData.get("report-note") || "");
    const website = String(formData.get("website") || "");

    if (!category) {
      setStatus("Choose a report category.", "error");
      form.querySelector("[name='report-category']")?.focus();
      return;
    }

    if (category === "other" && !note.trim()) {
      setStatus("Add a short note for an Other report.", "error");
      form.querySelector("[name='report-note']")?.focus();
      return;
    }

    if (!turnstileToken) {
      setStatus("Complete the verification before submitting.", "error");
      return;
    }

    setSubmitting(true);
    setStatus("Submitting report…");

    try {
      const payload = buildQuestionReportPayload({
        session: getSession(),
        questionId: reportContext.questionId,
        questionPosition: reportContext.questionPosition,
        category,
        note,
        turnstileToken,
        website,
      });

      await submitQuestionReport(payload, { endpoint });
      setStatus("Report submitted. Thank you for helping improve the question bank.", "success");
      submitButton.hidden = true;
      announce("Question report submitted.");
    } catch (error) {
      console.error(error);
      setStatus(error.message, "error");
      submitButton.hidden = false;
      resetTurnstile();
    } finally {
      setSubmitting(false);
    }
  });

  return {
    async open({ questionId, questionPosition, opener = document.activeElement }) {
      reportContext = { questionId, questionPosition };
      lastOpener = opener;
      form.reset();
      submitButton.hidden = false;
      setSubmitting(false);
      questionIdOutput.textContent = questionId;
      setStatus("");

      if (!dialog.open) {
        dialog.showModal();
      }

      form.querySelector("[name='report-category']")?.focus();
      await prepareTurnstile();
    },
  };
}

import assert from "node:assert/strict";
import test from "node:test";

import {
  buildQuestionReportPayload,
  submitQuestionReport,
} from "../src/assets/js/quiz/reporting.js";
import {
  handleQuestionReportRequest,
  normalizeQuestionReportPayload,
  verifyTurnstile,
} from "../functions/_lib/question-report.js";

function sampleSession() {
  return {
    test: {
      testId: "SEC-701",
      examVersion: "SY0-701",
    },
    dataVersion: "sha256:abc123",
    questions: {
      "SEC701-0000001": {
        question: {
          id: "SEC701-0000001",
          version: 2,
        },
        displayedAnswerIds: [
          "SEC701-0000001:C",
          "SEC701-0000001:A",
          "SEC701-0000001:D",
          "SEC701-0000001:B",
        ],
        selectedAnswerIds: ["SEC701-0000001:D"],
      },
    },
  };
}

function validPayload(overrides = {}) {
  return {
    questionId: "SEC701-0000001",
    testId: "SEC-701",
    examVersion: "SY0-701",
    questionVersion: 2,
    dataVersion: "sha256:abc123",
    category: "possible_typo",
    note: "There may be a missing word.",
    questionPosition: 3,
    displayedAnswerIds: [
      "SEC701-0000001:C",
      "SEC701-0000001:A",
      "SEC701-0000001:D",
      "SEC701-0000001:B",
    ],
    selectedAnswerIds: ["SEC701-0000001:D"],
    turnstileToken: "test-token",
    website: "",
    ...overrides,
  };
}

test("buildQuestionReportPayload preserves displayed answer order and stable IDs", () => {
  const payload = buildQuestionReportPayload({
    session: sampleSession(),
    questionId: "SEC701-0000001",
    questionPosition: 3,
    category: "possible_typo",
    note: "  Missing word  ",
    turnstileToken: "token",
  });

  assert.deepEqual(payload.displayedAnswerIds, [
    "SEC701-0000001:C",
    "SEC701-0000001:A",
    "SEC701-0000001:D",
    "SEC701-0000001:B",
  ]);
  assert.deepEqual(payload.selectedAnswerIds, ["SEC701-0000001:D"]);
  assert.equal(payload.note, "Missing word");
  assert.equal(payload.questionVersion, 2);
  assert.equal("correctAnswerIds" in payload, false);
});

test("normalizeQuestionReportPayload accepts a valid report", () => {
  const report = normalizeQuestionReportPayload(validPayload());
  assert.equal(report.category, "possible_typo");
  assert.equal(report.questionPosition, 3);
});

test("normalizeQuestionReportPayload requires a note for Other", () => {
  assert.throws(
    () => normalizeQuestionReportPayload(validPayload({ category: "other", note: "" })),
    /note is required/i,
  );
});

test("normalizeQuestionReportPayload rejects selected answers not in displayed order", () => {
  assert.throws(
    () => normalizeQuestionReportPayload(validPayload({
      selectedAnswerIds: ["SEC701-0000001:Z"],
    })),
    /not displayed|does not match/i,
  );
});

test("verifyTurnstile sends the token to Siteverify", async () => {
  let receivedToken = "";
  const result = await verifyTurnstile({
    token: "verified-token",
    secretKey: "secret",
    fetchImpl: async (_url, options) => {
      receivedToken = options.body.get("response");
      return new Response(JSON.stringify({ success: true, action: "question_report" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  });

  assert.equal(receivedToken, "verified-token");
  assert.equal(result.success, true);
});

test("submitQuestionReport returns a successful API response", async () => {
  const response = await submitQuestionReport(validPayload(), {
    fetchImpl: async (_url, options) => {
      assert.equal(options.method, "POST");
      return new Response(JSON.stringify({ ok: true, reportId: "report-1" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    },
  });

  assert.equal(response.reportId, "report-1");
});

test("question report handler verifies and inserts a report", async () => {
  const boundValues = [];
  const db = {
    prepare(sql) {
      assert.match(sql, /INSERT INTO question_reports/);
      return {
        bind(...values) {
          boundValues.push(...values);
          return {
            async run() {
              return { success: true };
            },
          };
        },
      };
    },
  };

  const request = new Request("https://certprep.example/api/question-report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://certprep.example",
      Referer: "https://certprep.example/security-plus/sy0-701/practice-test/",
    },
    body: JSON.stringify(validPayload()),
  });

  const response = await handleQuestionReportRequest({
    request,
    env: {
      REPORTS_DB: db,
      TURNSTILE_SECRET_KEY: "secret",
    },
  }, {
    fetchImpl: async () => new Response(JSON.stringify({
      success: true,
      action: "question_report",
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
    now: () => "2026-07-19T20:00:00.000Z",
    createId: () => "report-123",
  });

  const body = await response.json();
  assert.equal(response.status, 201);
  assert.equal(body.reportId, "report-123");
  assert.equal(boundValues[0], "report-123");
  assert.equal(boundValues[2], "SEC701-0000001");
});

test("question report handler rejects cross-origin submissions", async () => {
  const request = new Request("https://certprep.example/api/question-report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://other.example",
    },
    body: JSON.stringify(validPayload()),
  });

  const response = await handleQuestionReportRequest({ request, env: {} });
  assert.equal(response.status, 403);
});

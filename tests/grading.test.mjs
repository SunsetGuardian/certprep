import test from "node:test";
import assert from "node:assert/strict";

import {
  formatElapsedTime,
  getElapsedMilliseconds,
  gradeQuestionState,
  gradeQuizSession,
} from "../src/assets/js/quiz/grading.js";

function makeQuestionState({
  id = "SEC701-0000001",
  selectedAnswerIds = [],
  correctAnswerIds = [`${id}:B`],
  domain = { id: "1.0", name: "General Security Concepts" },
} = {}) {
  const answers = ["A", "B", "C", "D"].map((key) => ({
    id: `${id}:${key}`,
    text: `Answer ${key}`,
    explanation: `Explanation ${key}`,
  }));

  return {
    question: {
      id,
      type: correctAnswerIds.length > 1 ? "multi_select" : "single_choice",
      text: "Question text",
      topic: "Testing",
      domain,
      objective: { id: "1.1", text: "Objective" },
      answers,
      correctAnswerIds,
      correctExplanation: "Correct explanation",
    },
    displayedAnswerIds: [`${id}:D`, `${id}:B`, `${id}:A`, `${id}:C`],
    selectedAnswerIds,
    flaggedForReview: false,
  };
}

function makeGradingSession(states, completedAt = "2026-07-19T12:10:30.000Z") {
  const questionOrder = Object.keys(states);

  return {
    sessionVersion: 1,
    sessionId: "session-test",
    test: { testId: "SEC-701" },
    dataVersion: "sha256:test",
    startedAt: "2026-07-19T12:00:00.000Z",
    updatedAt: completedAt,
    completedAt,
    currentIndex: 0,
    questionOrder,
    questions: states,
  };
}

test("a correct answer is graded by stable identity, not displayed letter", () => {
  const state = makeQuestionState({ selectedAnswerIds: ["SEC701-0000001:B"] });
  const result = gradeQuestionState(state);

  assert.equal(state.displayedAnswerIds.indexOf("SEC701-0000001:B"), 1);
  assert.equal(result.status, "correct");
});

test("a selected wrong answer is graded as incorrect", () => {
  const state = makeQuestionState({ selectedAnswerIds: ["SEC701-0000001:D"] });
  assert.equal(gradeQuestionState(state).status, "incorrect");
});

test("a question with no selection is graded as unanswered", () => {
  assert.equal(gradeQuestionState(makeQuestionState()).status, "unanswered");
});

test("multi-select grading requires an exact answer-ID set regardless of order", () => {
  const id = "SEC701-0000001";
  const correctAnswerIds = [`${id}:B`, `${id}:D`];
  const correct = makeQuestionState({
    selectedAnswerIds: [`${id}:D`, `${id}:B`],
    correctAnswerIds,
  });
  const partial = makeQuestionState({
    selectedAnswerIds: [`${id}:B`],
    correctAnswerIds,
  });

  assert.equal(gradeQuestionState(correct).status, "correct");
  assert.equal(gradeQuestionState(partial).status, "incorrect");
});

test("session grading includes correct, incorrect, unanswered, and percentage totals", () => {
  const states = {
    "SEC701-0000001": makeQuestionState({
      id: "SEC701-0000001",
      selectedAnswerIds: ["SEC701-0000001:B"],
    }),
    "SEC701-0000002": makeQuestionState({
      id: "SEC701-0000002",
      selectedAnswerIds: ["SEC701-0000002:A"],
    }),
    "SEC701-0000003": makeQuestionState({ id: "SEC701-0000003" }),
  };
  const results = gradeQuizSession(makeGradingSession(states));

  assert.equal(results.total, 3);
  assert.equal(results.correct, 1);
  assert.equal(results.incorrect, 1);
  assert.equal(results.unanswered, 1);
  assert.equal(results.percentage, 33);
});

test("domain results are grouped and show raw counts", () => {
  const states = {
    "SEC701-0000001": makeQuestionState({
      id: "SEC701-0000001",
      selectedAnswerIds: ["SEC701-0000001:B"],
      domain: { id: "1.0", name: "General Security Concepts" },
    }),
    "SEC701-0000002": makeQuestionState({
      id: "SEC701-0000002",
      selectedAnswerIds: ["SEC701-0000002:A"],
      domain: { id: "1.0", name: "General Security Concepts" },
    }),
    "SEC701-0000003": makeQuestionState({
      id: "SEC701-0000003",
      domain: { id: "2.0", name: "Threats, Vulnerabilities, and Mitigations" },
    }),
  };
  const results = gradeQuizSession(makeGradingSession(states));

  assert.deepEqual(
    results.domains.map(({ id, total, correct, incorrect, unanswered }) => ({ id, total, correct, incorrect, unanswered })),
    [
      { id: "1.0", total: 2, correct: 1, incorrect: 1, unanswered: 0 },
      { id: "2.0", total: 1, correct: 0, incorrect: 0, unanswered: 1 },
    ],
  );
});

test("elapsed time uses the session start and completion timestamps", () => {
  const session = makeGradingSession({
    "SEC701-0000001": makeQuestionState(),
  });

  assert.equal(getElapsedMilliseconds(session), 630000);
  assert.equal(formatElapsedTime(630000), "10 minutes, 30 seconds");
});

test("elapsed time formatting handles seconds and hours", () => {
  assert.equal(formatElapsedTime(1000), "1 second");
  assert.equal(formatElapsedTime(45000), "45 seconds");
  assert.equal(formatElapsedTime(3600000), "1 hour");
  assert.equal(formatElapsedTime(7320000), "2 hours, 2 minutes");
  assert.equal(formatElapsedTime(null), "Not available");
});

test("grading rejects a question that has no correct answer identity", () => {
  const state = makeQuestionState({ correctAnswerIds: [] });
  assert.throws(() => gradeQuestionState(state), /does not define a correct answer/);
});

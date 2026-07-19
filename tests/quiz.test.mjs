import test from "node:test";
import assert from "node:assert/strict";

import { sampleWithoutReplacement, shuffleCopy } from "../src/assets/js/quiz/shuffle.js";
import {
  completeQuizSession,
  createQuizSession,
  getAnsweredCount,
  getFlaggedCount,
  getUnansweredCount,
  isValidQuizSession,
  moveToQuestion,
  setSelectedAnswerIds,
  toggleQuestionFlag,
} from "../src/assets/js/quiz/session.js";
import {
  clearStoredSession,
  loadStoredSession,
  saveStoredSession,
} from "../src/assets/js/quiz/storage.js";

function deterministicRandom(values) {
  let index = 0;
  return () => {
    const value = values[index % values.length];
    index += 1;
    return value;
  };
}

function makeQuestions(count = 4) {
  return Array.from({ length: count }, (_, index) => {
    const questionNumber = index + 1;
    const questionId = `SEC701-${String(questionNumber).padStart(7, "0")}`;

    return {
      id: questionId,
      version: 1,
      type: "single_choice",
      style: "direct",
      difficulty: "medium",
      instruction: null,
      text: `Question ${questionNumber}`,
      topic: "Testing",
      domain: { id: "1.0", name: "General Security Concepts" },
      objective: { id: "1.1", text: "Objective" },
      answers: ["A", "B", "C", "D"].map((key) => ({
        id: `${questionId}:${key}`,
        text: `Answer ${key}`,
        explanation: `Explanation ${key}`,
      })),
      correctAnswerIds: [`${questionId}:B`],
      correctExplanation: "Correct explanation",
      studyTopics: ["Testing"],
    };
  });
}

function makeSession(questionCount = 3) {
  return createQuizSession({
    test: { testId: "SEC-701", certification: "CompTIA Security+", examVersion: "SY0-701" },
    dataVersion: "sha256:test",
    questions: makeQuestions(5),
    questionCount,
    random: deterministicRandom([0.1, 0.8, 0.3, 0.6, 0.2]),
    now: () => "2026-07-19T12:00:00.000Z",
    sessionId: () => "session-test",
  });
}

test("shuffleCopy preserves all values and does not mutate the source", () => {
  const source = [1, 2, 3, 4];
  const shuffled = shuffleCopy(source, deterministicRandom([0.2, 0.7, 0.1]));

  assert.deepEqual(source, [1, 2, 3, 4]);
  assert.deepEqual([...shuffled].sort(), source);
  assert.notStrictEqual(shuffled, source);
});

test("sampleWithoutReplacement returns the requested number of unique values", () => {
  const sample = sampleWithoutReplacement([1, 2, 3, 4, 5], 3, deterministicRandom([0.4, 0.2, 0.9]));

  assert.equal(sample.length, 3);
  assert.equal(new Set(sample).size, 3);
});

test("a session contains unique questions and stable displayed answer identities", () => {
  const session = makeSession(3);

  assert.equal(session.questionOrder.length, 3);
  assert.equal(new Set(session.questionOrder).size, 3);

  for (const questionId of session.questionOrder) {
    const state = session.questions[questionId];
    const storedAnswerIds = state.question.answers.map((answer) => answer.id).sort();
    assert.deepEqual([...state.displayedAnswerIds].sort(), storedAnswerIds);
    assert.equal(state.question.correctAnswerIds[0], `${questionId}:B`);
  }
});

test("answer selections use stable answer IDs and update counts", () => {
  const session = makeSession();
  const questionId = session.questionOrder[0];
  const answerId = session.questions[questionId].question.answers[2].id;

  setSelectedAnswerIds(session, questionId, [answerId], () => "2026-07-19T12:01:00.000Z");

  assert.deepEqual(session.questions[questionId].selectedAnswerIds, [answerId]);
  assert.equal(getAnsweredCount(session), 1);
  assert.equal(getUnansweredCount(session), 2);
});

test("question flags and navigation persist in the session model", () => {
  const session = makeSession();
  const questionId = session.questionOrder[1];

  toggleQuestionFlag(session, questionId);
  moveToQuestion(session, 1);

  assert.equal(session.questions[questionId].flaggedForReview, true);
  assert.equal(getFlaggedCount(session), 1);
  assert.equal(session.currentIndex, 1);
});

test("JSON serialization preserves question order and displayed answer order", () => {
  const session = makeSession();
  const restored = JSON.parse(JSON.stringify(session));

  assert.deepEqual(restored.questionOrder, session.questionOrder);
  for (const questionId of session.questionOrder) {
    assert.deepEqual(
      restored.questions[questionId].displayedAnswerIds,
      session.questions[questionId].displayedAnswerIds,
    );
  }
  assert.equal(isValidQuizSession(restored, "SEC-701"), true);
});

test("completion records a timestamp without removing saved answers", () => {
  const session = makeSession();
  const questionId = session.questionOrder[0];
  const answerId = session.questions[questionId].question.answers[0].id;

  setSelectedAnswerIds(session, questionId, [answerId]);
  completeQuizSession(session, () => "2026-07-19T12:30:00.000Z");

  assert.equal(session.completedAt, "2026-07-19T12:30:00.000Z");
  assert.deepEqual(session.questions[questionId].selectedAnswerIds, [answerId]);
});

test("storage helpers save, load, and clear a session", () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const session = makeSession();

  saveStoredSession(storage, "quiz", session);
  assert.deepEqual(loadStoredSession(storage, "quiz"), session);

  clearStoredSession(storage, "quiz");
  assert.equal(loadStoredSession(storage, "quiz"), null);
});

test("an invalid random source is rejected", () => {
  assert.throws(() => shuffleCopy([1, 2], () => 1), RangeError);
});

import test from "node:test";
import assert from "node:assert/strict";

import {
  PAGED_RESULTS_PATH,
  createPagedCompletionModel,
} from "../src/assets/js/quiz/paged-completion.js";

function makeSession(answeredPositions = []) {
  const answered = new Set(answeredPositions);

  return {
    questionOrder: ["q1", "q2", "q3"],
    questions: {
      q1: {
        selectedAnswerIds: answered.has(1) ? ["q1-a"] : [],
      },
      q2: {
        selectedAnswerIds: answered.has(2) ? ["q2-b"] : [],
      },
      q3: {
        selectedAnswerIds: answered.has(3) ? ["q3-c"] : [],
      },
    },
  };
}

test("results return to the existing practice-test results interface", () => {
  assert.equal(
    PAGED_RESULTS_PATH,
    "/security-plus/sy0-701/practice-test/",
  );
});

test("non-final questions do not expose completion", () => {
  const model = createPagedCompletionModel(
    makeSession([1]),
    2,
  );

  assert.equal(model.isFinal, false);
  assert.equal(model.confirmationMessage, null);
});

test("the final question can finish immediately when all questions are answered", () => {
  const model = createPagedCompletionModel(
    makeSession([1, 2, 3]),
    3,
  );

  assert.equal(model.isFinal, true);
  assert.equal(model.unanswered, 0);
  assert.equal(model.confirmationMessage, null);
  assert.equal(model.resultsPath, PAGED_RESULTS_PATH);
});

test("one unanswered question receives singular confirmation copy", () => {
  const model = createPagedCompletionModel(
    makeSession([1, 3]),
    3,
  );

  assert.equal(model.unanswered, 1);
  assert.equal(
    model.confirmationMessage,
    "Finish this test with 1 unanswered question?",
  );
});

test("multiple unanswered questions receive plural confirmation copy", () => {
  const model = createPagedCompletionModel(
    makeSession([]),
    3,
  );

  assert.equal(model.unanswered, 3);
  assert.equal(
    model.confirmationMessage,
    "Finish this test with 3 unanswered questions?",
  );
});

test("invalid positions and malformed answer state are rejected", () => {
  assert.throws(
    () => createPagedCompletionModel(makeSession(), 0),
    RangeError,
  );

  const malformed = makeSession();
  delete malformed.questions.q2.selectedAnswerIds;

  assert.throws(
    () => createPagedCompletionModel(malformed, 3),
    TypeError,
  );
});

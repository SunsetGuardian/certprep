import test from "node:test";
import assert from "node:assert/strict";

import {
  answerInputType,
  savedAnswerStatus,
  updatePagedAnswerSelection,
} from "../src/assets/js/quiz/paged-answers.js";

const displayedAnswerIds = ["answer-c", "answer-a", "answer-b", "answer-d"];

test("single-choice questions use radio inputs", () => {
  assert.equal(answerInputType("single_choice"), "radio");
});

test("multi-select questions use checkbox inputs", () => {
  assert.equal(answerInputType("multi_select"), "checkbox");
});

test("a single-choice selection replaces the prior answer", () => {
  assert.deepEqual(
    updatePagedAnswerSelection({
      questionType: "single_choice",
      answerId: "answer-b",
      checked: true,
      selectedAnswerIds: ["answer-a"],
      displayedAnswerIds,
    }),
    ["answer-b"],
  );
});

test("multi-select additions preserve displayed answer order", () => {
  assert.deepEqual(
    updatePagedAnswerSelection({
      questionType: "multi_select",
      answerId: "answer-c",
      checked: true,
      selectedAnswerIds: ["answer-b", "answer-a", "answer-a"],
      displayedAnswerIds,
    }),
    ["answer-c", "answer-a", "answer-b"],
  );
});

test("multi-select answers can be removed without disturbing other selections", () => {
  assert.deepEqual(
    updatePagedAnswerSelection({
      questionType: "multi_select",
      answerId: "answer-a",
      checked: false,
      selectedAnswerIds: ["answer-c", "answer-a", "answer-b"],
      displayedAnswerIds,
    }),
    ["answer-c", "answer-b"],
  );
});

test("an answer outside the displayed order is rejected", () => {
  assert.throws(
    () =>
      updatePagedAnswerSelection({
        questionType: "single_choice",
        answerId: "answer-z",
        checked: true,
        selectedAnswerIds: [],
        displayedAnswerIds,
      }),
    RangeError,
  );
});

test("saved-answer status uses singular, plural, and empty wording", () => {
  assert.equal(savedAnswerStatus([]), "No answer saved yet");
  assert.equal(savedAnswerStatus(["answer-a"]), "1 saved answer");
  assert.equal(
    savedAnswerStatus(["answer-a", "answer-b"]),
    "2 saved answers",
  );
});

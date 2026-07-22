import test from "node:test";
import assert from "node:assert/strict";

import {
  createAnswerDomState,
} from "../src/assets/js/quiz/paged-answer-dom.js";

test("answer DOM state follows displayed answer order", () => {
  assert.deepEqual(
    createAnswerDomState(
      ["answer-c", "answer-a", "answer-b"],
      ["answer-b"],
    ),
    [
      {
        answerId: "answer-c",
        checked: false,
        selected: false,
      },
      {
        answerId: "answer-a",
        checked: false,
        selected: false,
      },
      {
        answerId: "answer-b",
        checked: true,
        selected: true,
      },
    ],
  );
});

test("multiple selected answers are reflected for checkbox questions", () => {
  assert.deepEqual(
    createAnswerDomState(
      ["answer-a", "answer-b", "answer-c"],
      ["answer-a", "answer-c"],
    ).filter((item) => item.checked).map((item) => item.answerId),
    ["answer-a", "answer-c"],
  );
});

test("missing selections produce an entirely unchecked state", () => {
  assert.equal(
    createAnswerDomState(["a", "b"], null)
      .every((item) => item.checked === false),
    true,
  );
});

test("displayed answer IDs must be an array", () => {
  assert.throws(
    () => createAnswerDomState(null, []),
    TypeError,
  );
});

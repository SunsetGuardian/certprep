import test from "node:test";
import assert from "node:assert/strict";

import {
  getPagedEntryPath,
  isClassicQuizMode,
} from "../src/assets/js/quiz/paged-entry.js";

function makeSession({
  currentIndex = 0,
  completedAt = null,
  count = 10,
} = {}) {
  return {
    completedAt,
    currentIndex,
    questionOrder: Array.from(
      { length: count },
      (_, index) => `question-${index + 1}`,
    ),
  };
}

test("classic mode is enabled only by the explicit query value", () => {
  assert.equal(isClassicQuizMode("?mode=classic"), true);
  assert.equal(isClassicQuizMode("?source=test&mode=classic"), true);
  assert.equal(isClassicQuizMode("?mode=paged"), false);
  assert.equal(isClassicQuizMode(""), false);
});

test("a new active session enters question 1", () => {
  assert.equal(
    getPagedEntryPath(makeSession()),
    "/security-plus/sy0-701/practice-test/question/1/",
  );
});

test("an unfinished session resumes its current numbered position", () => {
  assert.equal(
    getPagedEntryPath(makeSession({ currentIndex: 6 })),
    "/security-plus/sy0-701/practice-test/question/7/",
  );
});

test("classic mode keeps the established one-page engine", () => {
  assert.equal(
    getPagedEntryPath(
      makeSession({ currentIndex: 4 }),
      "?mode=classic",
    ),
    null,
  );
});

test("completed sessions remain on the base route for results", () => {
  assert.equal(
    getPagedEntryPath(
      makeSession({ completedAt: "2026-07-22T20:00:00.000Z" }),
    ),
    null,
  );
});

test("missing or malformed sessions do not create a paged route", () => {
  assert.equal(getPagedEntryPath(null), null);
  assert.equal(
    getPagedEntryPath({
      completedAt: null,
      currentIndex: 10,
      questionOrder: ["question-1"],
    }),
    null,
  );
});

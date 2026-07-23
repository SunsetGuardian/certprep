import test from "node:test";
import assert from "node:assert/strict";

import {
  createPagedFlagPresentation,
} from "../src/assets/js/quiz/paged-flag.js";

test("an unflagged question presents the flag action", () => {
  assert.deepEqual(
    createPagedFlagPresentation(false),
    {
      pressed: "false",
      label: "Flag for review",
      announcement: "Question flag removed.",
    },
  );
});

test("a flagged question presents the remove action", () => {
  assert.deepEqual(
    createPagedFlagPresentation(true),
    {
      pressed: "true",
      label: "Remove flag",
      announcement: "Question flagged for review.",
    },
  );
});

test("non-boolean flag state is rejected", () => {
  for (const value of [null, 0, 1, "true", undefined]) {
    assert.throws(
      () => createPagedFlagPresentation(value),
      TypeError,
    );
  }
});

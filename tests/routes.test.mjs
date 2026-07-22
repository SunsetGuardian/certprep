import test from "node:test";
import assert from "node:assert/strict";

import {
  MAX_PAGED_QUESTION_COUNT,
  PRACTICE_TEST_PATH,
  buildQuestionPath,
  isValidQuestionPosition,
  parseQuestionPosition,
  questionPositionToSessionIndex,
  sessionIndexToQuestionPosition,
} from "../src/assets/js/quiz/routes.js";

test("the paged route uses the versioned practice-test base path", () => {
  assert.equal(
    PRACTICE_TEST_PATH,
    "/security-plus/sy0-701/practice-test",
  );
});

test("question paths are generated for the first and last supported positions", () => {
  assert.equal(
    buildQuestionPath(1),
    "/security-plus/sy0-701/practice-test/question/1/",
  );
  assert.equal(
    buildQuestionPath(MAX_PAGED_QUESTION_COUNT),
    "/security-plus/sy0-701/practice-test/question/50/",
  );
});

test("question path generation rejects positions outside the supported range", () => {
  for (const value of [0, 51, -1, 1.5, "1", null]) {
    assert.throws(() => buildQuestionPath(value), RangeError);
  }
});

test("question positions are parsed from canonical and slashless paths", () => {
  assert.equal(
    parseQuestionPosition(
      "/security-plus/sy0-701/practice-test/question/7/",
    ),
    7,
  );
  assert.equal(
    parseQuestionPosition(
      "/security-plus/sy0-701/practice-test/question/7",
    ),
    7,
  );
});

test("query strings and fragments do not change the parsed position", () => {
  assert.equal(
    parseQuestionPosition(
      "/security-plus/sy0-701/practice-test/question/12/?source=pilot#answer",
    ),
    12,
  );
});

test("unrelated, malformed, and unsupported paths return null", () => {
  const invalidPaths = [
    "/security-plus/sy0-701/practice-test/",
    "/security-plus/sy0-701/practice-test/question/0/",
    "/security-plus/sy0-701/practice-test/question/01/",
    "/security-plus/sy0-701/practice-test/question/51/",
    "/security-plus/sy0-701/practice-test/question/seven/",
    "/security-plus/sy0-701/practice-test/results/",
  ];

  for (const pathname of invalidPaths) {
    assert.equal(parseQuestionPosition(pathname), null);
  }

  assert.equal(parseQuestionPosition(null), null);
});

test("URL positions and zero-based session indexes convert in both directions", () => {
  assert.equal(questionPositionToSessionIndex(1), 0);
  assert.equal(questionPositionToSessionIndex(50), 49);
  assert.equal(sessionIndexToQuestionPosition(0), 1);
  assert.equal(sessionIndexToQuestionPosition(49), 50);
});

test("position and index conversions honor a shorter active test", () => {
  assert.equal(questionPositionToSessionIndex(10, 10), 9);
  assert.equal(sessionIndexToQuestionPosition(9, 10), 10);
  assert.throws(() => questionPositionToSessionIndex(11, 10), RangeError);
  assert.throws(() => sessionIndexToQuestionPosition(10, 10), RangeError);
});

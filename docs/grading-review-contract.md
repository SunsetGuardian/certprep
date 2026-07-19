# Grading and Review Contract

## Purpose

This document defines the browser-side grading and review behavior for the Cert Prep quiz engine. The authoritative question schema remains `docs/question-schema.md`.

## Grading identity

The engine grades stable answer IDs, not stored CSV positions and not displayed letters.

Example:

```text
SEC701-0000001:B
```

Displayed letters are derived from each session's saved `displayedAnswerIds` order. A correct answer may therefore appear as A, B, C, or D in different sessions without changing its identity.

## Question status

Each question receives one result status:

- `correct`: the selected answer-ID set exactly matches the correct answer-ID set
- `incorrect`: at least one answer was selected, but the selected set does not exactly match
- `unanswered`: no answer was selected

Exact set comparison supports single-answer and future multi-select questions. Order does not affect multi-select grading, but missing or extra selections make the result incorrect.

## Overall score

The percentage is:

```text
correct questions / total questions
```

The result is rounded to the nearest whole percentage. Unanswered questions remain in the denominator and are reported separately.

## Domain results

Domain results show raw counts for only the questions presented in the current randomized session:

- Total
- Correct
- Incorrect
- Unanswered

The interface does not label small samples as strengths, weaknesses, or mastery.

## Elapsed time

Elapsed time is calculated from `startedAt` through `completedAt`. It includes the full elapsed browser-session time, not only active reading time.

## Review order

Review pages must use the session's saved question order and `displayedAnswerIds`. Answers must never be shuffled again during review.

For incorrect and unanswered questions, the review displays:

- Question position and stable ID
- Question text and optional instruction
- Domain
- Objective
- Topic
- User selection or unanswered status
- Correct answer
- Every answer choice in its original displayed order
- The explanation attached to every answer choice
- The overall correct-answer explanation

Correct questions use the same review format inside an expandable section.

## Persistence

Completed results are calculated from the saved question snapshot in session storage. A later data deployment does not change a completed or unfinished test already stored in the browser tab.

Returning to the test clears `completedAt`, permits answer changes, and requires the user to finish again before updated results are shown.

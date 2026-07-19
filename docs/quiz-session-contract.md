# Quiz Session Contract

## Purpose

The quiz session model preserves a visitor's randomized test within the current browser tab. It keeps question order, displayed answer order, selected answers, flags, and current position stable during navigation and page refreshes.

The session is stored in `sessionStorage`. It is not a user account, long-term test history, or cross-device record.

## Storage key

```text
certprep.quiz.SEC-701.session.v1
```

Each test ID receives a separate key.

## Session shape

```json
{
  "sessionVersion": 1,
  "sessionId": "browser-generated ID",
  "test": {
    "testId": "SEC-701",
    "certification": "CompTIA Security+",
    "examVersion": "SY0-701"
  },
  "dataVersion": "sha256:...",
  "startedAt": "2026-07-19T12:00:00.000Z",
  "updatedAt": "2026-07-19T12:04:00.000Z",
  "completedAt": null,
  "currentIndex": 0,
  "questionOrder": [
    "SEC701-0000008",
    "SEC701-0000002"
  ],
  "questions": {
    "SEC701-0000008": {
      "question": {
        "id": "SEC701-0000008",
        "answers": []
      },
      "displayedAnswerIds": [
        "SEC701-0000008:D",
        "SEC701-0000008:A",
        "SEC701-0000008:C",
        "SEC701-0000008:B"
      ],
      "selectedAnswerIds": [],
      "flaggedForReview": false
    }
  }
}
```

## Stable identities

Displayed letters are derived from the saved `displayedAnswerIds` order. They are never stored as grading identities.

For example, the first displayed answer can be labeled `A` while its stable answer ID remains:

```text
SEC701-0000008:D
```

Selected answers are stored as stable answer IDs. This allows Phase 4 grading to compare `selectedAnswerIds` with `correctAnswerIds` without depending on displayed position.

## Question snapshot

Each session stores the selected public question objects as a snapshot. A deployment that updates the public question bank will not silently alter an unfinished test already open in a visitor's tab.

## Completion

Phase 3 records `completedAt` and displays answered, unanswered, and flagged counts. Phase 4 will add grading, domain results, elapsed time, and answer review while retaining this session contract.

# Question reporting contract

Phase 5 adds private reports for questionable quiz items. Reporting is separate from the local **Flag for review** control.

## Visitor workflow

A visitor can open the same report form from:

- The active question toolbar
- Any question card in the completed-test review

The visitor chooses one category:

- `possible_typo`
- `correct_answer_may_be_wrong`
- `explanation_unclear`
- `question_outdated`
- `duplicate_question`
- `other`

A written note is optional except when the category is `other`.

## Data sent by the browser

The browser sends only the troubleshooting context needed to identify the item and reproduce the visitor's displayed order:

- Question ID
- Project test ID
- Official exam version
- Question version
- Runtime question-data version
- Report category
- Optional note
- Position within the randomized test
- Displayed answer IDs in their exact order
- Selected answer IDs
- Turnstile token

The browser does not submit answer text, the correct-answer IDs, a name, or an email address.

## Data added by the server

The Pages Function adds:

- A random report ID
- Server submission time
- Same-origin referring page
- Initial review status of `new`

The visitor IP address may be sent transiently to Turnstile verification, but it is not stored in the D1 report table.

## Validation and abuse protection

The Pages Function:

- Accepts `POST` requests only
- Requires same-origin browser submissions
- Limits request size
- Validates every field and answer identity
- Uses a hidden honeypot field
- Requires server-side Turnstile verification
- Stores the report only after validation succeeds

Turnstile tokens are verified against the action name `question_report`.

## Storage

Reports are stored privately in the D1 table created by:

```text
migrations/0001_question_reports.sql
```

Review statuses are:

- `new`
- `reviewing`
- `resolved`
- `dismissed`

A private administrative review interface is intentionally deferred. Reports can initially be inspected and updated through the D1 console.

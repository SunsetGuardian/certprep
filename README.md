# Cert Prep

Cert Prep is a free certification practice-test and study-resource website. The initial certification is CompTIA Security+.

- Project test ID: `SEC-701`
- Official exam version represented: `SY0-701`
- Hosting: Cloudflare Pages
- Site generator: Eleventy
- Quiz interface: Vanilla JavaScript
- Question authoring: CSV

The site is independent and is not affiliated with or endorsed by CompTIA. CompTIA and Security+ are trademarks of CompTIA, Inc.

## Current status

The repository contains:

- An authoritative question schema and objective map
- Separate draft, active, and retired question files
- A Python question-bank validator
- A tested CSV-to-JSON runtime data pipeline
- Versioned quiz manifests with stable answer identities
- A randomized browser quiz engine
- Session-scoped answer, flag, navigation, and answer-order persistence
- Overall grading, domain counts, elapsed time, and detailed answer review
- Question reporting through a Cloudflare Pages Function, Turnstile, and D1
- Python and JavaScript automated tests

## Core workflow

`docs/question-schema.md` is authoritative. The production quiz consumes only:

```text
data/security-plus/sec-701/questions.csv
```

The build validates the full question bank, runs the Python and JavaScript tests, converts approved active questions into generated JSON, and builds the Eleventy site into `_site`.

Generated JSON is recreated during every build and is not committed.

## Commands

```text
npm run validate:data
npm test
npm run build:data
npm run build
npm start
```

## Runtime contracts

- `docs/runtime-data-contract.md` defines the generated public question data.
- `docs/quiz-session-contract.md` defines the browser session model.
- `docs/grading-review-contract.md` defines grading and result-review behavior.
- `docs/question-reporting-contract.md` defines report collection and storage.
- `docs/cloudflare-reporting-setup.md` explains the required D1 and Turnstile configuration.

## Cloudflare Pages

```text
Build command: npm run build
Build output directory: _site
```

Question reporting additionally requires the `REPORTS_DB` D1 binding, `TURNSTILE_SITE_KEY` environment variable, and `TURNSTILE_SECRET_KEY` secret.

# Cloudflare question-reporting setup

The Phase 5 code deploys safely before these resources are configured, but report submission remains disabled until a Turnstile site key is available at build time.

## 1. Create the D1 database

In the Cloudflare dashboard:

1. Open **Storage & Databases**.
2. Open **D1 SQL Database**.
3. Create a database named `certprep-reports`.
4. Open the database console.
5. Paste and execute the contents of `migrations/0001_question_reports.sql`.

## 2. Bind D1 to the Pages project

Open the `certprep-e0r` Pages project:

1. Open **Settings**.
2. Open **Bindings** or **Variables and Secrets**, depending on the dashboard view.
3. Add a D1 database binding.
4. Use the variable name `REPORTS_DB`.
5. Select the `certprep-reports` database.
6. Add the binding to Production. Add a Preview binding later only when preview reporting is needed.

## 3. Create the Turnstile widget

In the Cloudflare Turnstile section:

1. Create a widget named `Cert Prep question reports`.
2. Use Managed mode.
3. Add `certprep-e0r.pages.dev` as an allowed hostname.
4. Add the future production hostname when one is connected.
5. Copy the public site key and secret key.

## 4. Add Pages variables and secrets

In the Pages project's **Settings > Variables and Secrets**:

- Add `TURNSTILE_SITE_KEY` as a plain environment variable containing the public site key.
- Add `TURNSTILE_SECRET_KEY` as an encrypted secret containing the secret key.

Apply both values to Production. Preview deployments need their own values and a Turnstile hostname that matches the preview URL.

The site key is intentionally public and is inserted into the built practice-test page. The secret key is available only to the Pages Function.

## 5. Redeploy

After adding `TURNSTILE_SITE_KEY`, start a new Pages deployment so Eleventy can insert the site key into the page.

## 6. Test a report

1. Open the SY0-701 practice test.
2. Start a test.
3. Select **Report question**.
4. Choose a category, complete Turnstile, and submit.
5. Open the D1 console and run:

```sql
SELECT
  report_id,
  submitted_at,
  question_id,
  report_category,
  note,
  review_status
FROM question_reports
ORDER BY submitted_at DESC;
```

The newest report should appear with `review_status` set to `new`.

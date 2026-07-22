
# Phase 6 launch setup

The code overlay adds the SEO, policy, social-preview, and launch-validation
foundation. The remaining items are dashboard tasks because they are tied to
the Cert Happens Cloudflare and search-engine accounts.

## 1. Confirm contact email delivery

The public pages display these bot-resistant contact labels:

- `contact [at] certhappens [dot] com`
- `privacy [at] certhappens [dot] com`

Confirm the domain's existing catch-all or explicit routing rules deliver
messages addressed to those labels. The public pages intentionally avoid
clickable email links and unobscured email addresses.

## 2. Enable Cloudflare Web Analytics

1. In Cloudflare, open **Web Analytics**.
2. Select **Add a site**.
3. Select `certhappens.com`.
4. Use the automatic setup for the proxied hostname.
5. Confirm page views appear after visiting several public pages.

Do not paste a second beacon into the site if automatic injection is enabled.

Cloudflare Web Analytics does not currently support custom events. Phase 6
therefore tracks page traffic and performance, but does not create unreliable
quiz-start or quiz-completion events. A first-party aggregate event endpoint can
be added later if those metrics become important.

## 3. Make the apex domain canonical

Import `docs/cloudflare-canonical-redirects.csv` into a Cloudflare Bulk Redirect
List and enable a Bulk Redirect Rule for that list.

The list permanently redirects:

- `www.certhappens.com` to `https://certhappens.com`
- `certhappens.pages.dev` to `https://certhappens.com`
- the old `certprep-e0r.pages.dev` address to `https://certhappens.com`

Each rule preserves the original path and query string.

After propagation, verify examples such as:

- `https://www.certhappens.com/security-plus/`
- `https://certhappens.pages.dev/security-plus/practice-test/`

Both should land on the matching path at `https://certhappens.com`.

## 4. Google Search Console

1. Add a **Domain property** for `certhappens.com`.
2. Complete DNS verification in Cloudflare.
3. Submit `https://certhappens.com/sitemap.xml`.
4. Inspect the homepage and the SY0-701 practice-test URL.
5. Request indexing after the redirect and canonical checks pass.

## 5. Bing Webmaster Tools

Import the verified Google Search Console property or verify the domain
directly. Submit the same sitemap URL.

## 6. Validate the deployed output

Check these URLs after the Cloudflare build:

- `/robots.txt`
- `/sitemap.xml`
- `/site.webmanifest`
- `/privacy/`
- `/terms/`
- `/disclaimer/`
- `/contact/`
- `/404.html`

Use Google's Rich Results Test on the Security+ pages to confirm the
BreadcrumbList markup. Use a social-preview debugger later when social accounts
are ready.

## 7. Functional launch check

- Start a 10-question test.
- Refresh during the test and confirm restoration.
- Finish with at least one unanswered question.
- Open correct and incorrect review sections.
- Submit a test question report.
- Confirm the report reaches D1.
- Test keyboard focus and mobile layout.
- Check the browser console for errors.
- Confirm `www` and both `pages.dev` addresses redirect to the apex domain.

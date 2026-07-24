# Cert Happens content authoring contract

This document defines the reusable front matter and editorial rules for indexable educational articles.

## Required front matter

```yaml
layout: layouts/article.njk
title: Clear page title
description: Unique search description that accurately summarizes the page
permalink: /stable/lowercase/path/
ogType: article
author: certHappens
datePublished: YYYY-MM-DD
articleSection: Certification or topic group
eyebrow: Short page label
lede: One useful sentence that explains what the reader will get
breadcrumbs:
  - label: Home
    url: /
  - label: Parent page
    url: /parent/
  - label: Current page
toc:
  - id: exact-section-id
    label: Reader-facing section label
keywords:
  - Focused topic
relatedLinks:
  - title: Useful related page
    url: /related-page/
    description: Why the link helps
```

Use `dateModified` only when an article receives a meaningful factual or instructional update. Do not refresh dates for spelling corrections, formatting changes, or routine builds. The sitemap uses `dateModified` when present and otherwise uses `datePublished`.

Publication and modification dates are retained for structured data, the sitemap, and maintenance. The shared article layout does not display a byline or publication date in the visible page header.

## Printable guides

Enable the shared print control only for resources that are useful as printed notes or saved documents:

```yaml
printable: true
printTitle: Security+ SY0-701 Study Guide
```

The article layout supplies the centered **Print | Save** control, accessible button name, printer symbol, print script, and branded document header. `src/assets/css/print.css` handles the printable presentation. Keep the web article as the single content source rather than maintaining a separate PDF.

Do not create article-specific print CSS unless the content introduces a pattern that should become reusable across guides.

## Advertising and printable content

Future advertising components must use the shared `ad-slot` class and `data-ad-slot` attribute. The print stylesheet hides those selectors, common advertisement containers, and provider-injected ad elements so **Print | Save** output remains a clean study document.

Do not place essential article text, headings, references, or navigation inside an ad container. Printed guides must remain complete when every advertising element is removed.

## Heading and table-of-contents rules

- The article layout creates the only `h1`.
- Start article sections with `h2` and subsections with `h3`.
- Give each table-of-contents section a stable HTML ID, for example `<h2 id="risk-analysis">Risk analysis</h2>`.
- Keep the front-matter `toc` entries synchronized with those IDs.
- Do not change a published section ID casually because external and internal links may point to it.

## Reuse before adding code

Educational growth should come primarily from Markdown content and front matter.

Before adding a template, component, or CSS class:

1. Check whether an existing layout or content pattern can present the material clearly.
2. Add a shared component only when it will be useful on multiple pages.
3. Name components for their purpose, such as `article-callout` or `table-scroll`, rather than for a specific article or exam objective.
4. Keep site navigation in `src/_data/siteNavigation.json` so the header and footer use one shared source.

The expected long-term page types are the base layout, hub pages, articles, tools, and the stable quiz interface.

## Writing standard

Every article should solve a real reader problem. It should teach, compare, demonstrate, or help the reader make a decision.

Prefer:

- Plain language and direct reader-focused wording
- Concrete examples and scenario clues
- Clear distinctions between commonly confused concepts
- Short paragraphs and descriptive headings
- Useful bold cues that help scanning
- Original synthesis supported by authoritative references
- Occasional restrained humor when it grows naturally from the topic

Avoid:

- Generic introductions that could appear on any website
- Repeating the same point under several headings
- Search phrases inserted unnaturally
- Unverifiable claims, pass promises, or invented certainty
- Empty conclusions that merely restate the introduction
- AI clichés and em dashes in public copy
- Thin pages created only to target a keyword variation
- Repeated contrast formulas such as “It is not X. It is Y.”
- Mechanical groups of three used mainly for rhythm
- Polished transitions that add no information
- Humor added on a predictable schedule

Cert Happens brand humor can appear in error states, reporting messages, and an occasional appropriate line. Educational articles should use it more sparingly than Sunset Guardian articles.

## Human-writing review

Complete this review before publishing an article:

1. Search for repeated negative contrasts, especially “not X, but Y” and “It is not X. It is Y.”
2. Check for repeated sentence openings and paragraphs with identical rhythms.
3. Remove framing that sounds polished but does not teach anything.
4. Replace broad advice with a scenario, example, command, log clue, or decision rule where one would help.
5. Make sure any humor belongs to the surrounding explanation.
6. Read the introduction and final section together, then remove repeated points.
7. Read the page aloud and revise sentences that sound scripted or overly formal.
8. Confirm that every section answers a question a real learner might ask.
9. Check that recommendations are clearly separated from official exam facts.
10. Scan public copy for em dashes before committing.

A few natural contrasts are acceptable when the subject requires them. The warning is about a repeated writing pattern, not a banned word.

## Sources and maintenance

- Use primary sources whenever possible for exam rules, objectives, standards, laws, protocols, and product behavior.
- Link to the source most directly supporting the factual claim.
- Verify time-sensitive exam details before publishing or updating them.
- Distinguish official facts from Cert Happens recommendations.
- Retain exam-version context so an older article does not silently appear current after a new exam launches.

## Internal linking

Every educational article should normally link to:

- Its certification or topic hub
- A relevant practice test or tool, when one genuinely helps
- One or more deeper or supporting articles, once available

Link text should describe the destination. Avoid strings of unrelated links added only for search engines.

## Article schema and authorship

`layouts/article.njk` creates Article and BreadcrumbList structured data from front matter. Author records live in `src/_data/authors.json`.

The organization author is `Cert Happens`. Authorship and publication dates remain in metadata and are not shown in the visible article header. An About page may be added later as a low-priority footer resource, but article publication does not depend on it.

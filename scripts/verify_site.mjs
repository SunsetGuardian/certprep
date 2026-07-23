import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.resolve("_site");
const errors = [];

function fail(message) {
  errors.push(message);
}

async function isFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(absolute)));
    } else {
      files.push(absolute);
    }
  }

  return files;
}

function getMeta(html, name, property = false) {
  const attribute = property ? "property" : "name";
  const expression = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    "i"
  );
  const reverseExpression = new RegExp(
    `<meta\\s+[^>]*content=["']([^"']*)["'][^>]*${attribute}=["']${name}["'][^>]*>`,
    "i"
  );

  return html.match(expression)?.[1] || html.match(reverseExpression)?.[1] || "";
}

function localTarget(href) {
  const clean = href.split("#")[0].split("?")[0];

  if (!clean || !clean.startsWith("/") || clean.startsWith("//")) {
    return null;
  }

  if (clean.startsWith("/api/") || clean.startsWith("/quiz-data/")) {
    return null;
  }

  if (clean === "/") {
    return path.join(outputRoot, "index.html");
  }

  if (path.extname(clean)) {
    return path.join(outputRoot, clean.replace(/^\/+/, ""));
  }

  return path.join(outputRoot, clean.replace(/^\/+/, ""), "index.html");
}

const requiredFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "privacy/index.html",
  "terms/index.html",
  "disclaimer/index.html",
  "contact/index.html",
  "security-plus/index.html",
  "security-plus/sy0-701/practice-test/index.html",
  "security-plus/sy0-701/study-guide/index.html",
  "security-plus/sy0-701/study-guide/general-security-concepts/index.html",
  "security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/index.html",
  "security-plus/sy0-701/study-guide/security-architecture/index.html",
  "_redirects",
  "assets/brand/certhappens-social-card.png",
  "assets/css/site.css",
  "assets/css/print.css",
  "assets/js/print-guide.js"
];

for (const relative of requiredFiles) {
  if (!(await isFile(path.join(outputRoot, relative)))) {
    fail(`Missing required build output: ${relative}`);
  }
}

const siteCssPath = path.join(outputRoot, "assets/css/site.css");
if (await isFile(siteCssPath)) {
  const siteCss = await readFile(siteCssPath, "utf8");

  if (/\.article-body\s+(?:th|td):last-child/.test(siteCss)) {
    fail("site.css: retired article-table last-column sizing rule is present");
  }

  if (!siteCss.includes(".table-scroll") || !siteCss.includes("overflow-x: auto")) {
    fail("site.css: responsive article-table scrolling is missing");
  }

  if (!siteCss.includes("table-layout: auto") || !siteCss.includes("overflow-wrap: anywhere")) {
    fail("site.css: shared article tables are missing flexible wrapping rules");
  }

  const requiredFirstColumnRules = [
    ".article-body th:first-child",
    ".article-body td:first-child",
    "min-width: 6.5rem",
    "overflow-wrap: normal",
    "word-break: normal",
    "hyphens: none"
  ];

  for (const rule of requiredFirstColumnRules) {
    if (!siteCss.includes(rule)) {
      fail(`site.css: article-table first-column rule is missing: ${rule}`);
    }
  }
}

const printCssPath = path.join(outputRoot, "assets/css/print.css");
if (await isFile(printCssPath)) {
  const printCss = await readFile(printCssPath, "utf8");

  if (/pre,\s*table,\s*figure\s*\{/.test(printCss)) {
    fail("print.css: whole tables are still blocked from splitting across pages");
  }

  const requiredPrintTableRules = [
    "display: table-header-group",
    "page-break-inside: auto",
    "white-space: normal !important",
    "overflow-wrap: anywhere",
    "border: 0 !important"
  ];

  for (const rule of requiredPrintTableRules) {
    if (!printCss.includes(rule)) {
      fail(`print.css: shared printable-table rule is missing: ${rule}`);
    }
  }


  const requiredPrintFirstColumnRules = [
    "th:first-child",
    "td:first-child",
    "min-width: 1.05in !important",
    "word-break: normal !important",
    "hyphens: none !important"
  ];

  for (const rule of requiredPrintFirstColumnRules) {
    if (!printCss.includes(rule)) {
      fail(`print.css: printable first-column rule is missing: ${rule}`);
    }
  }
}

const allFiles = await walk(outputRoot);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const relative = path.relative(outputRoot, file);
  const html = await readFile(file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();

  if (!title) {
    fail(`${relative}: missing title`);
  }

  const description = getMeta(html, "description");
  if (!description) {
    fail(`${relative}: missing meta description`);
  }

  const robots = getMeta(html, "robots");
  const isNoIndex = /\bnoindex\b/i.test(robots);

  if (/mailto:/i.test(html)) {
    fail(`${relative}: clickable email link found; public contact addresses must remain text-only`);
  }

  if (/[A-Z0-9._%+-]+@certhappens\.com/i.test(html)) {
    fail(`${relative}: unobscured CertHappens email address found`);
  }

  if (!isNoIndex) {
    const canonical =
      html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] ||
      html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)?.[1];

    if (!canonical?.startsWith("https://certhappens.com/")) {
      fail(`${relative}: missing or invalid canonical URL`);
    }

    if (!getMeta(html, "og:image", true)) {
      fail(`${relative}: missing Open Graph image`);
    }
  }

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) {
    fail(`${relative}: expected exactly one h1, found ${h1Count}`);
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt\s*=/i.test(match[1])) {
      fail(`${relative}: image without alt attribute`);
    }
  }

  for (const match of html.matchAll(
    /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi
  )) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      fail(`${relative}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const target = localTarget(match[1]);
    if (target && !(await isFile(target))) {
      fail(`${relative}: broken internal link ${match[1]}`);
    }
  }

  if (html.includes('class="article-body prose"')) {
    const articleTableCount = (html.match(/<table\b/gi) || []).length;
    const tableScrollCount = (
      html.match(/class=["'][^"']*\btable-scroll\b[^"']*["']/gi) || []
    ).length;

    if (articleTableCount > 0 && tableScrollCount !== articleTableCount) {
      fail(
        `${relative}: expected one shared table-scroll wrapper per article table, found ${tableScrollCount} wrappers for ${articleTableCount} tables`
      );
    }

    if (!html.includes('"@type": "Article"')) {
      fail(`${relative}: article page is missing Article structured data`);
    }

    if (!html.includes('"@type": "BreadcrumbList"')) {
      fail(`${relative}: article page is missing breadcrumb structured data`);
    }

    if (!/"datePublished"\s*:\s*"\d{4}-\d{2}-\d{2}"/.test(html)) {
      fail(`${relative}: article page is missing a structured publication date`);
    }

    if (/class=["']article-meta["']/.test(html)) {
      fail(`${relative}: article page contains visible byline or date metadata`);
    }

    if (html.includes("data-print-guide")) {
      if (!html.includes('href="/assets/css/print.css" media="print"')) {
        fail(`${relative}: printable article is missing the shared print stylesheet`);
      }

      if (!html.includes('src="/assets/js/print-guide.js"')) {
        fail(`${relative}: printable article is missing the shared print control script`);
      }

      if (!html.includes('class="site-header__print-title"')) {
        fail(`${relative}: printable article is missing the branded print title`);
      }

      if (!html.includes('class="article-print-button__icon"')) {
        fail(`${relative}: printable article is missing the shared printer icon`);
      }

      if (!html.includes('data-print-icon="printer"')) {
        fail(`${relative}: printable article is missing the standard printer symbol`);
      }

      if (!html.includes('aria-label="Print or save this guide"')) {
        fail(`${relative}: printable article is missing the accessible print-control name`);
      }

      if (!html.includes('<span aria-hidden="true">Print | Save</span>')) {
        fail(`${relative}: printable article is missing the shared Print | Save label`);
      }

      if (html.includes("Print / Save PDF")) {
        fail(`${relative}: printable article contains the retired print-control label`);
      }
    }
  }

  if (relative === "security-plus/sy0-701/study-guide/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: study guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Security\+ SY0-701 Study Guide<\/h1>/.test(html)) {
      fail(`${relative}: study guide is missing the independent Security+ title`);
    }

    if (/<h1[^>]*>\s*CompTIA\b/i.test(html)) {
      fail(`${relative}: study guide H1 should not present the guide as CompTIA material`);
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/general-security-concepts/')) {
      fail(`${relative}: study guide is missing its Domain 1 guide link`);
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/')) {
      fail(`${relative}: study guide is missing its Domain 2 guide link`);
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/security-architecture/')) {
      fail(`${relative}: study guide is missing its Domain 3 guide link`);
    }
  }

  if (relative === "security-plus/sy0-701/study-guide/general-security-concepts/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Domain 1 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Security\+ SY0-701 Domain 1: General Security Concepts<\/h1>/.test(html)) {
      fail(`${relative}: Domain 1 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "security-controls",
      "core-concepts",
      "zero-trust-physical-deception",
      "change-management",
      "cryptography-pki",
      "review-checklist"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Domain 1 guide is missing section #${id}`);
      }
    }
  }

  if (relative === "security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Domain 2 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Security\+ SY0-701 Domain 2: Threats, Vulnerabilities, and Mitigations<\/h1>/.test(html)) {
      fail(`${relative}: Domain 2 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "threat-actors",
      "vectors-surfaces",
      "vulnerabilities",
      "malicious-activity",
      "mitigations",
      "review-checklist"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Domain 2 guide is missing section #${id}`);
      }
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/security-architecture/')) {
      fail(`${relative}: Domain 2 guide is missing its Domain 3 guide link`);
    }
  }

  if (relative === "security-plus/sy0-701/study-guide/security-architecture/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Domain 3 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Security\+ SY0-701 Domain 3: Security Architecture<\/h1>/.test(html)) {
      fail(`${relative}: Domain 3 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "architecture-models",
      "enterprise-infrastructure",
      "data-protection",
      "resilience-recovery",
      "review-checklist"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Domain 3 guide is missing section #${id}`);
      }
    }
  }

  if (relative.startsWith("security-plus/sy0-701/practice-test/question/")) {
    if (!/<h1\b[^>]*data-paged-position[^>]*>/i.test(html)) {
      fail(`${relative}: paged question heading is missing its dynamic position marker`);
    }

    if (/class=["']paged-quiz__question-id["']/.test(html)) {
      fail(`${relative}: paged question still contains the retired duplicate question-ID wrapper`);
    }
  }
}

if (await isFile(path.join(outputRoot, "site.webmanifest"))) {
  try {
    JSON.parse(await readFile(path.join(outputRoot, "site.webmanifest"), "utf8"));
  } catch (error) {
    fail(`site.webmanifest: invalid JSON (${error.message})`);
  }
}

if (await isFile(path.join(outputRoot, "robots.txt"))) {
  const robots = await readFile(path.join(outputRoot, "robots.txt"), "utf8");
  if (!robots.includes("Sitemap: https://certhappens.com/sitemap.xml")) {
    fail("robots.txt: canonical sitemap reference missing");
  }
}

if (await isFile(path.join(outputRoot, "_redirects"))) {
  const redirects = await readFile(path.join(outputRoot, "_redirects"), "utf8");
  const expectedRedirects = [
    "/security-plus/practice-test /security-plus/sy0-701/practice-test/ 302",
    "/security-plus/practice-test/ /security-plus/sy0-701/practice-test/ 302"
  ];

  for (const rule of expectedRedirects) {
    if (!redirects.includes(rule)) {
      fail(`_redirects is missing required rule: ${rule}`);
    }
  }
}

if (await isFile(path.join(outputRoot, "sitemap.xml"))) {
  const sitemap = await readFile(path.join(outputRoot, "sitemap.xml"), "utf8");
  const expectedUrls = [
    "https://certhappens.com/",
    "https://certhappens.com/security-plus/",
    "https://certhappens.com/security-plus/sy0-701/practice-test/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/general-security-concepts/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/security-architecture/",
    "https://certhappens.com/privacy/",
    "https://certhappens.com/terms/",
    "https://certhappens.com/disclaimer/",
    "https://certhappens.com/contact/"
  ];

  for (const url of expectedUrls) {
    if (!sitemap.includes(`<loc>${url}</loc>`)) {
      fail(`sitemap.xml: missing ${url}`);
    }
  }

  const datedArticleUrls = [
    "https://certhappens.com/security-plus/sy0-701/study-guide/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/general-security-concepts/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/security-architecture/"
  ];

  for (const url of datedArticleUrls) {
    const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const entry = sitemap.match(
      new RegExp(`<url>[\\s\\S]*?<loc>${escapedUrl}</loc>[\\s\\S]*?</url>`)
    )?.[0];

    if (!entry || !/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(entry)) {
      fail(`sitemap.xml: publication or modification date is missing for ${url}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Site verification failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Site verification passed for ${htmlFiles.length} HTML files.`);
}

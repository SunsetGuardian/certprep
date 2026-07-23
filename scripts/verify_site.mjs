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
  "_redirects",
  "assets/brand/certhappens-social-card.png",
  "assets/css/print.css",
  "assets/js/print-guide.js"
];

for (const relative of requiredFiles) {
  if (!(await isFile(path.join(outputRoot, relative)))) {
    fail(`Missing required build output: ${relative}`);
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
    }
  }

  if (relative === "security-plus/sy0-701/study-guide/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: study guide is missing the Print / Save PDF control`);
    }

    if (!/<h1>Security\+ SY0-701 Study Guide<\/h1>/.test(html)) {
      fail(`${relative}: study guide is missing the independent Security+ title`);
    }

    if (/<h1[^>]*>\s*CompTIA\b/i.test(html)) {
      fail(`${relative}: study guide H1 should not present the guide as CompTIA material`);
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

  const studyGuideEntry = sitemap.match(
    /<url>[\s\S]*?<loc>https:\/\/certhappens\.com\/security-plus\/sy0-701\/study-guide\/<\/loc>[\s\S]*?<\/url>/
  )?.[0];

  if (!studyGuideEntry || !/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(studyGuideEntry)) {
    fail("sitemap.xml: study guide publication or modification date is missing");
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

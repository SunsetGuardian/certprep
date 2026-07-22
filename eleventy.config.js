
function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/quiz-data": "quiz-data" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  eleventyConfig.addWatchTarget("src/assets/css");

  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());
  eleventyConfig.addFilter("json", (value) =>
    JSON.stringify(value).replaceAll("<", "\\u003c")
  );
  eleventyConfig.addFilter("xmlEscape", escapeXml);

  eleventyConfig.addCollection("sitemapPages", (collectionApi) =>
    collectionApi
      .getAll()
      .filter((item) => {
        if (item.data?.sitemap === false || !item.url) {
          return false;
        }

        if (
          item.url.startsWith("/quiz-data/") ||
          item.url.startsWith("/api/") ||
          item.url.endsWith(".xml") ||
          item.url.endsWith(".txt") ||
          item.url.endsWith(".webmanifest") ||
          item.url === "/404.html"
        ) {
          return false;
        }

        return item.url.endsWith("/");
      })
      .sort((left, right) => left.url.localeCompare(right.url))
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "md", "njk"]
  };
}

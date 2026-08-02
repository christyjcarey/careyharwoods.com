const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Static assets copied straight through to the built site
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Draft support: files with `draft: true` show up in `npm start`
  // previews but are excluded from published builds.
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  // ---- Collections -------------------------------------------------------
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("events", (api) =>
    api.getFilteredByGlob("src/events/*.md").sort((a, b) => a.date - b.date)
  );

  // ---- Date filters ------------------------------------------------------
  const TZ = "America/New_York";

  // "March 16, 2024"
  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  // "Sat, Aug 20"
  eleventyConfig.addFilter("shortDate", (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  // "2024-03-16" (for <time datetime> and data attributes)
  eleventyConfig.addFilter("isoDate", (date) =>
    new Date(date).toISOString().slice(0, 10)
  );

  // Day of month, e.g. "20"
  eleventyConfig.addFilter("dayOfMonth", (date) =>
    String(new Date(date).getUTCDate())
  );

  // Short month, e.g. "AUG"
  eleventyConfig.addFilter("monthAbbr", (date) =>
    new Date(date)
      .toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })
      .toUpperCase()
  );

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  // Serialize the events collection for the client-side calendar grid
  eleventyConfig.addFilter("eventsJson", (events) =>
    JSON.stringify(
      events.map((e) => ({
        title: e.data.title,
        start: new Date(e.date).toISOString().slice(0, 10),
        end: e.data.endDate
          ? new Date(e.data.endDate).toISOString().slice(0, 10)
          : null,
        time: e.data.time || "",
        location: e.data.location || "",
        status: e.data.status || "confirmed",
      }))
    )
  );

  // Excerpt: first paragraph of a post's rendered content, stripped of tags
  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return "";
    const text = content
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 200 ? text.slice(0, 200).trim() + "…" : text;
  });

  // Absolute URLs relative to site root work on GitHub Pages project sites
  // (careyharwoods.github.io/repo) as well as the custom domain.
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

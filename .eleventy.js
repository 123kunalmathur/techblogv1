const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItPrism = require("markdown-it-prism");

module.exports = function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/styles/");
  
  // Configure Markdown
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }).use(markdownItPrism, {
    defaultLanguage: 'plaintext'
  });
  eleventyConfig.setLibrary("md", markdownLibrary);
  
  // Date filters
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("LLLL dd, yyyy");
  });
  
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-MM-dd');
  });
  
  eleventyConfig.addFilter("isoDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO();
  });
  
  eleventyConfig.addFilter("rssDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toRFC2822();
  });
  
  // Content filters
  eleventyConfig.addFilter('escape', function(content) {
    return (content || '').replace(/[&<>"']/g, function(match) {
      const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return escapeMap[match];
    });
  });
  
  // Reading time filter
  eleventyConfig.addFilter("readingTime", function(content) {
    const wordsPerMinute = 200;
    const codeWordsPerMinute = 100; // Slower for code
    
    // Remove HTML tags
    const textContent = content.replace(/<[^>]*>/g, '');
    
    // Count code blocks (slower reading)
    const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).join(' ');
    const codeWords = codeBlocks.split(/\s+/).length;
    
    // Count regular text words
    const textWords = textContent.replace(/```[\s\S]*?```/g, '').split(/\s+/).length;
    
    const readingTime = Math.ceil((textWords / wordsPerMinute) + (codeWords / codeWordsPerMinute));
    return readingTime;
  });
  
  // Word count filter
  eleventyConfig.addFilter('wordcount', function(content) {
    if (!content) return 0;
    const text = content.replace(/<[^>]*>/g, '');
    return text.trim().split(/\s+/).length;
  });
  
  // Slice filter for arrays
  eleventyConfig.addFilter('slice', function(array, start, end) {
    if (!Array.isArray(array)) return array;
    return array.slice(start, end);
  });
  
  // URL and SEO filters
  eleventyConfig.addFilter('absoluteUrl', function(url) {
    const siteUrl = this.ctx.site?.url || 'https://tech-insights.dev';
    if (url.startsWith('http')) return url;
    return new URL(url, siteUrl).toString();
  });
  
  eleventyConfig.addFilter('excerpt', function(content, length = 200) {
    if (!content) return '';
    const text = content.replace(/<[^>]*>/g, '');
    if (text.length <= length) return text;
    const truncated = text.substring(0, length);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      return truncated.substring(0, lastSpace) + '...';
    }
    return truncated + '...';
  });
  
  // Tag-related filters
  eleventyConfig.addFilter('filterByTag', function(posts, tag) {
    if (!tag) return posts;
    return posts.filter(post => {
      const tags = post.data?.tags || [];
      return tags.includes(tag);
    });
  });
  
  eleventyConfig.addFilter('getAllTags', function(posts) {
    const tagSet = new Set();
    posts.forEach(post => {
      const tags = post.data?.tags || [];
      tags.forEach(tag => {
        if (tag !== 'post') {
          tagSet.add(tag);
        }
      });
    });
    return Array.from(tagSet).sort();
  });
  
  eleventyConfig.addFilter('getTagCount', function(posts, tag) {
    return posts.filter(post => {
      const tags = post.data?.tags || [];
      return tags.includes(tag);
    }).length;
  });
  
  // Collections
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/posts/*.md")
      .filter(item => !item.data.draft)
      .sort((a, b) => b.date - a.date);
  });
  
  eleventyConfig.addCollection("featuredPosts", function(collection) {
    return collection.getFilteredByGlob("src/posts/*.md")
      .filter(item => item.data.featured && !item.data.draft)
      .sort((a, b) => b.date - a.date)
      .slice(0, 3);
  });
  
  eleventyConfig.addCollection("recentPosts", function(collection) {
    return collection.getFilteredByGlob("src/posts/*.md")
      .filter(item => !item.data.draft)
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);
  });
  
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getFilteredByGlob("src/posts/*.md").forEach(item => {
      (item.data.tags || []).forEach(tag => {
        if (tag !== 'post') {
          tagSet.add(tag);
        }
      });
    });
    return Array.from(tagSet).sort();
  });
  
  eleventyConfig.addCollection("postsByTag", function(collection) {
    const posts = collection.getFilteredByGlob("src/posts/*.md");
    const tagMap = new Map();
    
    posts.forEach(post => {
      const tags = post.data?.tags || [];
      tags.forEach(tag => {
        if (tag !== 'post') {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, []);
          }
          tagMap.get(tag).push(post);
        }
      });
    });
    
    tagMap.forEach((posts, tag) => {
      posts.sort((a, b) => b.date - a.date);
    });
    
    return tagMap;
  });
  
  // Shortcodes
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  
  eleventyConfig.addPairedShortcode('callout', function(content, type = 'info') {
    return `<div class="callout callout-${type}">${markdownLibrary.render(content)}</div>`;
  });
  
  eleventyConfig.addShortcode('readingProgress', function() {
    return `<div class="reading-progress" id="reading-progress">
        <div class="reading-progress-bar" id="reading-progress-bar"></div>
      </div>`;
  });
  
  // HTML minification in production
  if (process.env.NODE_ENV === 'production') {
    const htmlmin = require('html-minifier');
    
    eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
      if (outputPath && outputPath.endsWith('.html')) {
        return htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        });
      }
      return content;
    });
  }
  
  // Configuration
  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],
    
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    
    pathPrefix: "/techblogv1/",
    
    dir: {
      input: "src",
      includes: "templates",
      data: "_data",
      output: "_site"
    }
  };
};
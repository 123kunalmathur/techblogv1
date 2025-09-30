# Build System API Contract

**Purpose**: Define the interface between content and generated static files

## Template Data API

### Article Template Data
**Context**: Available in article layout templates

```javascript
{
  // Article data
  title: string,
  date: Date,
  excerpt: string,
  content: string,        // Processed HTML
  tags: array[Tag],
  readingTime: integer,
  featured: boolean,
  
  // Auto-generated
  slug: string,
  url: string,
  previousArticle: Article | null,
  nextArticle: Article | null,
  relatedArticles: array[Article],  // Max 3, by shared tags
  
  // Metadata
  wordCount: integer,
  codeLanguages: array[string],
  lastModified: Date,
  
  // SEO
  socialImage: string,    // Auto-generated or custom
  metaDescription: string
}
```

### Tag Data API
**Context**: Available in tag pages and filtering

```javascript
{
  name: string,           // slug format
  displayName: string,    // human readable
  description: string,
  articleCount: integer,
  articles: array[Article],  // All articles with this tag
  relatedTags: array[Tag]    // Tags that often appear together
}
```

### Site Data API
**Context**: Available globally in all templates

```javascript
{
  title: string,
  description: string,
  url: string,
  author: Author,
  navigation: array[NavigationItem],
  
  // Generated collections
  articles: array[Article],        // All published articles
  recentArticles: array[Article],  // Last 5 articles
  featuredArticles: array[Article], // Featured articles
  tags: array[Tag],               // All tags with counts
  popularTags: array[Tag],        // Top 10 by article count
  
  // Build metadata
  buildDate: Date,
  version: string
}
```

## URL Structure Contract

```
/                           # Homepage with intro and recent articles
/articles/                  # All articles paginated
/articles/page/2/          # Pagination
/articles/tag/{tag}/       # Articles filtered by tag
/articles/{slug}/          # Individual article
/about/                    # Author information page
/feed.xml                  # RSS feed
/sitemap.xml              # XML sitemap
```

## Performance Requirements

### Critical Path
- HTML: Semantic structure, no layout shift
- CSS: Critical styles inlined, non-critical deferred
- JavaScript: Progressive enhancement only
- Images: Lazy loaded below fold, responsive variants

### Metrics Targets
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Total page load: < 3s
- Accessibility score: 100/100
- SEO score: 90+/100

## Content Processing Pipeline

### Markdown Processing
1. Parse frontmatter and validate against schema
2. Process markdown to HTML with syntax highlighting
3. Calculate reading time (content-aware algorithm)
4. Extract headings for table of contents
5. Optimize images and generate responsive variants
6. Generate social media preview images

### Asset Processing
1. Compile Sass to CSS
2. Minify and autoprefix CSS
3. Bundle and tree-shake JavaScript
4. Optimize images (WebP conversion, compression)
5. Generate asset manifest with hashes

### SEO Processing
1. Generate meta descriptions from excerpts
2. Create Open Graph images
3. Build XML sitemap
4. Generate RSS feed
5. Create structured data (JSON-LD)

## Error Handling

### Validation Errors
- Invalid frontmatter: Build fails with detailed error
- Missing required fields: Build fails with field name
- Future-dated articles: Skip in production, warn in development
- Broken links: Warn and generate report

### Build Failures
- Template errors: Detailed stack trace with file/line
- Asset processing errors: Stop build, show specific asset
- Performance budget exceeded: Fail build with metrics report
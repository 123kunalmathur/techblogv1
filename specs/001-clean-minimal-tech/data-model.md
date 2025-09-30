# Data Model: Clean Minimal Tech Blog

**Date**: 2025-09-30  
**Feature**: Clean Minimal Tech Blog

## Entity Definitions

### Author Profile
**Purpose**: Represents the blog owner and author information

**Fields**:
- `name` (string, required): Full name of the author
- `title` (string, required): Professional title/role
- `bio` (string, required): Professional biography (200-500 words)
- `photo` (string, required): Path to author photo
- `email` (string, optional): Contact email address
- `social` (object, optional): Social media links
  - `github` (string): GitHub profile URL
  - `linkedin` (string): LinkedIn profile URL  
  - `twitter` (string): Twitter/X profile URL
- `skills` (array[string], required): List of technical skills/technologies
- `location` (string, optional): Geographic location

**Validation Rules**:
- Bio must be 50-1000 characters
- Photo must be optimized web format (WebP with fallback)
- Social links must be valid URLs
- Skills array limited to 20 items

**Storage**: YAML frontmatter in `content/pages/about.md`

### Article
**Purpose**: Individual blog post with content and metadata

**Fields**:
- `title` (string, required): Article title
- `slug` (string, auto-generated): URL-friendly version of title
- `date` (datetime, required): Publication date (ISO 8601)
- `lastModified` (datetime, auto): Last edit timestamp
- `excerpt` (string, required): Brief description for listings (150-300 chars)
- `content` (markdown, required): Full article content
- `tags` (array[string], required): Categorization tags
- `readingTime` (integer, auto-calculated): Estimated reading time in minutes
- `draft` (boolean, default: false): Publication status
- `featured` (boolean, default: false): Highlight on homepage
- `codeLanguages` (array[string], auto-detected): Programming languages used in article

**Validation Rules**:
- Title must be 10-100 characters
- Excerpt must be 50-300 characters
- Tags limited to 10 per article, lowercase alphanumeric
- Content must contain at least 200 words
- Date cannot be in the future

**Storage**: Markdown files in `content/posts/` with YAML frontmatter

**Relationships**:
- Author: One-to-many (one author, many articles)
- Tags: Many-to-many (articles can have multiple tags, tags can have multiple articles)

### Tag
**Purpose**: Content categorization and filtering

**Fields**:
- `name` (string, required): Tag name (lowercase, alphanumeric)
- `displayName` (string, required): Human-readable tag name
- `description` (string, optional): Tag description
- `color` (string, optional): Hex color for visual distinction
- `articleCount` (integer, auto-calculated): Number of articles with this tag

**Validation Rules**:
- Name must be 2-20 characters, lowercase, no spaces
- Display name must be 2-30 characters
- Color must be valid hex code if provided

**Storage**: Auto-generated from article frontmatter, stored in site data

### Site Configuration
**Purpose**: Global site settings and metadata

**Fields**:
- `title` (string, required): Site title
- `description` (string, required): Site description for SEO
- `url` (string, required): Base URL for the site
- `author` (reference): Reference to Author Profile
- `navigation` (array[object]): Site navigation items
  - `label` (string): Display text
  - `url` (string): Link destination
- `social` (object): Site-level social media
- `analytics` (object, optional): Analytics configuration
- `performance` (object): Performance settings
  - `imageOptimization` (boolean): Enable image optimization
  - `cssMinification` (boolean): Enable CSS minification
  - `lazyLoading` (boolean): Enable image lazy loading

**Storage**: YAML file at `_data/site.yml`

## Data Flow

### Content Creation Flow
1. Author creates Markdown file in `content/posts/`
2. Frontmatter validates against Article schema
3. Build system processes:
   - Calculates reading time from content
   - Extracts code languages from syntax highlighting
   - Generates slug from title
   - Updates tag registry
4. Static HTML generated with processed data

### Tag System Flow
1. Tags extracted from all published articles
2. Tag registry built with counts and metadata
3. Tag pages generated for filtering
4. Navigation includes popular tags

### Build-Time Data Processing
- Article reading time calculation (content-aware algorithm)
- Image optimization and responsive variants
- Syntax highlighting pre-processing
- SEO metadata generation
- Site map and RSS feed generation

## Performance Considerations

### Data Loading Strategy
- All data processed at build time (no runtime database)
- JSON data files for client-side filtering/search
- Pagination for article lists (10 articles per page)
- Lazy loading for images and non-critical content

### Caching Strategy
- Static files cached with long expiration
- Asset versioning for cache busting
- Service worker for offline functionality
- CDN caching for global performance

### Search and Filtering
- Client-side search using pre-built index
- Tag filtering without page reloads
- History API for URL state management
- Debounced search input for performance
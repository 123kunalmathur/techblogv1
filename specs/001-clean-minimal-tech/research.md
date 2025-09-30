# Research: Clean Minimal Tech Blog

**Date**: 2025-09-30  
**Feature**: Clean Minimal Tech Blog

## Static Site Generator Decision

**Decision**: Use Eleventy (11ty)  
**Rationale**: 
- Zero-config approach aligns with minimal dependencies principle
- Supports multiple template languages (Liquid, Nunjucks, Handlebars)
- Excellent performance and minimal JavaScript footprint
- Strong markdown processing with frontmatter support
- Flexible data cascade system for content organization
- Active community and good documentation

**Alternatives considered**:
- Jekyll: Ruby dependency adds complexity, slower build times
- Hugo: Go binary good for speed but less flexible templating
- Gatsby: React-based violates minimal dependencies principle
- Next.js: Framework overhead conflicts with constitution

## CSS Architecture Decision

**Decision**: Use Sass with PostCSS for processing  
**Rationale**:
- Sass provides variables, mixins, and nesting for maintainable CSS
- PostCSS autoprefixer ensures browser compatibility
- Can compile to pure CSS without runtime dependencies
- Supports CSS custom properties for modern browsers
- Integrates well with 11ty build pipeline

**Alternatives considered**:
- Vanilla CSS: Harder to maintain, no variables/mixins
- Tailwind CSS: Utility-first approach may bloat HTML
- Styled-components: Requires React, violates constitution

## Syntax Highlighting Decision

**Decision**: Use Prism.js with custom language pack  
**Rationale**:
- Lightweight and modular (only load needed languages)
- Supports all required languages: JS/TS, Python, Rust, Go, C++, SQL, HTML, CSS
- Can be included as build-time dependency (no runtime JS required)
- Excellent theme support for clean, readable code blocks
- Good accessibility features (proper semantic markup)

**Alternatives considered**:
- highlight.js: Larger bundle size for equivalent language support
- CodeMirror: Overkill for static highlighting, adds complexity
- Server-side highlighting: Adds build complexity without benefit

## Performance Optimization Strategy

**Decision**: Multi-layered performance approach  
**Rationale**:
- Image optimization: WebP with fallbacks, responsive images
- CSS: Critical CSS inlining, minification, unused CSS removal
- JavaScript: Minimal usage, ES6 modules, tree shaking
- HTML: Semantic markup, preconnect hints, meta tags optimization
- Build: Asset hashing, compression, service worker for caching

**Key metrics to track**:
- Time to First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s  
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

## Content Management Strategy

**Decision**: Markdown with YAML frontmatter  
**Rationale**:
- Human-readable and version control friendly
- Frontmatter enables rich metadata (tags, dates, reading time)
- Supports rich content (code blocks, images, links)
- Can be processed at build time for performance
- Easy migration path if switching generators later

**Frontmatter schema**:
```yaml
---
title: "Article Title"
date: 2025-09-30
tags: ["javascript", "performance"]
excerpt: "Brief description for article lists"
readingTime: auto  # calculated by build system
draft: false
---
```

## Accessibility Implementation Plan

**Decision**: Progressive enhancement with semantic HTML  
**Rationale**:
- Start with semantic HTML that works without CSS/JS
- Add ARIA labels where semantic HTML insufficient
- Ensure keyboard navigation for all interactive elements
- Maintain focus management for single-page app features
- Use color contrast ratios >4.5:1 for normal text

**Testing strategy**:
- Automated testing with axe-core
- Manual testing with screen readers
- Keyboard-only navigation testing
- Color contrast validation tools

## Deployment Strategy

**Decision**: Netlify with GitHub integration  
**Rationale**:
- Excellent static site hosting with global CDN
- Automatic deployments from Git commits
- Built-in form handling if needed later
- Free tier suitable for personal blog
- Good performance optimization features

**Alternatives considered**:
- Vercel: Similar features, slightly more complex setup
- GitHub Pages: Limited build options, no custom headers
- AWS S3: Requires more manual configuration

## Development Workflow

**Decision**: Local development with live reload  
**Rationale**:
- 11ty dev server with hot reload for content changes
- Sass watch mode for style compilation
- Browser-sync for multi-device testing
- Git hooks for pre-commit accessibility testing

**Build pipeline**:
1. Content processing (Markdown → HTML)
2. Asset optimization (images, CSS, JS)
3. Accessibility validation
4. Performance auditing
5. Static file generation
6. Deployment to CDN
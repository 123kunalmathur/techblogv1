# Quickstart Guide: Clean Minimal Tech Blog

**Date**: 2025-09-30  
**Purpose**: Validate implementation against user scenarios

## Prerequisites

- Node.js 18+ installed
- Git repository initialized
- Basic familiarity with Markdown

## Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install -g @11ty/eleventy
npm install --save-dev sass postcss autoprefixer
```

### 2. Initialize Project Structure
```bash
mkdir -p content/{posts,pages,assets}
mkdir -p src/{templates,styles,scripts}
mkdir -p tests/{accessibility,performance,content}
mkdir -p _data
```

### 3. Create Configuration
```bash
# .eleventy.js - Basic Eleventy config
# package.json - Build scripts
# _data/site.yml - Site configuration
```

## Content Creation (10 minutes)

### 1. Configure Author Profile
Edit `_data/site.yml`:
```yaml
title: "Your Tech Blog"
description: "Insights on software development and technology"
url: "https://yourblog.dev"
author:
  name: "Your Name"
  title: "Software Engineer"
  bio: "Passionate developer with expertise in modern web technologies"
  photo: "/assets/images/author.jpg"
  skills: ["JavaScript", "Python", "React"]
```

### 2. Create First Article
Create `content/posts/hello-world.md`:
```yaml
---
title: "Hello World: Starting My Tech Blog"
date: "2025-09-30"
excerpt: "Welcome to my new tech blog where I'll share insights about software development and emerging technologies."
tags: ["meta", "introduction"]
featured: true
---

## Welcome

This is my first blog post...

```javascript
console.log("Hello, world!");
```

## What's Next

Stay tuned for more content about...
```

### 3. Create About Page
Create `content/pages/about.md` with author information.

## Build and Test (5 minutes)

### 1. Development Server
```bash
npm run dev
# Opens http://localhost:8080
```

### 2. Validate Core Scenarios

#### Scenario A: Homepage Experience
1. **Navigate to http://localhost:8080**
2. **Verify**: Author photo and bio visible
3. **Verify**: Recent articles list shows "Hello World" post
4. **Verify**: Clean, minimal design
5. **Verify**: Navigation works (Home, Articles, About)

#### Scenario B: Article Reading
1. **Click on "Hello World" article**
2. **Verify**: Full article content displays
3. **Verify**: Syntax highlighting works for JavaScript
4. **Verify**: Reading time estimate shown
5. **Verify**: Tags displayed as clickable elements

#### Scenario C: Tag Filtering
1. **Click on "introduction" tag**
2. **Verify**: Filtered view shows only tagged articles
3. **Verify**: Clear indication of active filter
4. **Verify**: Easy return to all articles

#### Scenario D: Responsive Design
1. **Resize browser to mobile width**
2. **Verify**: Layout adapts appropriately
3. **Verify**: Navigation remains functional
4. **Verify**: Content remains readable

### 3. Performance Validation
```bash
npm run build
npm run test:performance
```

**Expected results**:
- Page load time < 3 seconds
- Lighthouse score > 90
- No accessibility violations

### 4. Accessibility Testing
```bash
npm run test:accessibility
```

**Expected results**:
- WCAG 2.1 AA compliance
- Keyboard navigation functional
- Screen reader compatible

## Content Expansion (Ongoing)

### Adding New Articles
1. Create new `.md` file in `content/posts/`
2. Add required frontmatter
3. Write content with proper headings
4. Test locally before publishing

### Managing Tags
1. Use consistent, lowercase tag names
2. Limit to 3-5 tags per article
3. Review tag usage periodically for consistency

### Performance Monitoring
1. Run performance tests before publishing
2. Monitor Core Web Vitals in production
3. Optimize images as content grows

## Deployment (10 minutes)

### Option A: Netlify
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on commits

### Option B: GitHub Pages
1. Enable GitHub Pages in repository settings
2. Use GitHub Actions for build process
3. Deploy to `gh-pages` branch

## Success Criteria Checklist

- [ ] Homepage loads with author intro
- [ ] Articles display in chronological order
- [ ] Individual articles are readable and well-formatted
- [ ] Syntax highlighting works for target languages
- [ ] Tags function as clickable filters
- [ ] Site is fully responsive
- [ ] Page load times under 3 seconds
- [ ] WCAG 2.1 AA compliance achieved
- [ ] Navigation is intuitive and accessible
- [ ] Content can be easily added and managed

## Troubleshooting

### Common Issues
- **Build fails**: Check frontmatter syntax in articles
- **Styles missing**: Verify Sass compilation setup
- **Images not loading**: Check file paths and optimization
- **Poor performance**: Review image sizes and CSS

### Performance Debugging
- Use browser dev tools Network tab
- Run Lighthouse audits regularly
- Monitor bundle sizes
- Test on slower connections

## Next Steps

After successful quickstart:
1. Customize visual design
2. Add more content types (tutorials, case studies)
3. Implement search functionality
4. Set up analytics and monitoring
5. Create content calendar
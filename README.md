# Tech Insights - Clean Minimal Tech Blog

A minimalist tech blog built with Eleventy, inspired by den.dev's clean design aesthetic. Features modern web development practices with constitutional compliance for performance, accessibility, and maintainability.

![Tech Blog Screenshot](https://via.placeholder.com/800x400/f8fafc/1a1a1a?text=Tech+Insights+Blog)

## ✨ Features

- **🎨 Clean Design**: Den.dev inspired minimal aesthetic
- **⚡ Performance**: <2s load time with optimized assets
- **♿ Accessible**: WCAG 2.1 AA compliant
- **📱 Responsive**: Mobile-first design
- **🔍 SEO Optimized**: RSS feed, sitemap, structured data
- **🎯 Syntax Highlighting**: Prism.js for multiple languages
- **📖 Reading Time**: Content-aware calculation
- **🏷️ Tag Filtering**: Interactive article organization
- **🚀 Static Site**: Fast, secure, and deployable anywhere

## 🛠️ Tech Stack

- **Static Site Generator**: [Eleventy (11ty)](https://11ty.dev) v2.0.1
- **CSS Preprocessor**: [Sass](https://sass-lang.com) with PostCSS
- **Syntax Highlighting**: [Prism.js](https://prismjs.com)
- **Templates**: Nunjucks (`.njk`)
- **Content**: Markdown with YAML frontmatter
- **Build Tool**: npm scripts
- **Testing**: Playwright + axe-core + Lighthouse

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tech_blog

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:8080` with live reload.

### Development Commands

```bash
# Development server with live reload
npm run dev

# Build for production
npm run build

# Build CSS only
npm run build:css

# Clean build artifacts
npm run clean

# Run tests
npm test

# Lint code
npm run lint
npm run lint:fix
```

## 📁 Project Structure

```
tech_blog/
├── src/
│   ├── _data/              # Global data files
│   │   ├── site.yml        # Site configuration
│   │   └── author.yml      # Author profile
│   ├── posts/              # Blog posts (Markdown)
│   ├── templates/          # Nunjucks templates
│   │   ├── base-simple.njk # Base layout
│   │   ├── homepage.njk    # Homepage template
│   │   ├── article-simple.njk # Article template
│   │   └── articles-simple.njk # Article listing
│   ├── styles/             # Sass stylesheets
│   │   └── den-inspired.scss # Main styles
│   └── assets/             # Static assets
│       └── js/             # JavaScript files
├── tests/                  # Test suites
│   ├── accessibility/      # WCAG compliance tests
│   ├── performance/        # Speed and optimization tests
│   └── content/           # Content validation tests
├── _site/                 # Generated site (build output)
├── .eleventy.js          # Eleventy configuration
└── package.json          # Dependencies and scripts
```

## ✍️ Writing Content

### Creating a New Post

1. Create a new Markdown file in `src/posts/`:

```markdown
---
title: \"Your Post Title\"
date: 2024-03-15
description: \"Brief description for SEO and excerpts\"
tags:
  - javascript
  - tutorial
layout: article-simple.njk
---

Your content here...
```

2. The post will automatically appear in:
   - Homepage recent articles
   - Articles listing page
   - RSS feed
   - Sitemap

### Supported Languages for Syntax Highlighting

- **Web**: JavaScript, TypeScript, HTML, CSS, SCSS, JSON
- **Backend**: Python, SQL, Bash
- **Systems**: Rust, Go, C++, C

### Content Guidelines

- **Frontmatter**: Required for all posts
- **Images**: Place in `src/assets/images/`
- **Excerpts**: Auto-generated from description
- **Reading Time**: Calculated automatically
- **Tags**: Use lowercase, kebab-case

## 🎨 Customization

### Styling

The design system is in `src/styles/den-inspired.scss`:

```scss
:root {
  /* Colors */
  --color-text: #000000;
  --color-background: #ffffff;
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
  
  /* Spacing */
  --space-sm: 1rem;
  --space-md: 1.5rem;
}
```

### Site Configuration

Update `src/_data/site.yml`:

```yaml
title: \"Your Site Title\"
description: \"Your site description\"
url: \"https://yoursite.com\"
author:
  name: \"Your Name\"
  email: \"your@email.com\"
```

### Author Profile

Update `src/_data/author.yml` with your information.

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Individual Test Suites

```bash
# Accessibility (WCAG 2.1 AA)
npm run test:accessibility

# Performance (<2s load time)
npm run test:performance

# Content validation
npm run test:content
```

## 📊 Performance

The blog is optimized for speed:

- **Target**: <2 seconds load time
- **CSS**: Compressed and minified
- **HTML**: Minified in production
- **Images**: Responsive and optimized
- **JavaScript**: Minimal, progressive enhancement
- **Static**: No server-side rendering needed

### Performance Features

- ✅ Static site generation
- ✅ CSS minification and compression
- ✅ HTML minification
- ✅ Responsive images
- ✅ Minimal JavaScript footprint
- ✅ Tree-shaken dependencies
- ✅ Optimized font loading

## ♿ Accessibility

WCAG 2.1 AA compliant features:

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Focus management
- ✅ Skip links
- ✅ Color contrast (4.5:1+)
- ✅ Screen reader friendly
- ✅ Keyboard navigation
- ✅ Alt text for images

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output will be in `_site/` directory.

### Deploy to Netlify

1. Connect your Git repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `_site`
4. Deploy!

### Deploy to Vercel

```bash
npx vercel --prod
```

### Deploy to GitHub Pages

1. Build the site: `npm run build`
2. Push `_site/` contents to `gh-pages` branch

## 🔧 Configuration

### Eleventy Configuration

Key settings in `.eleventy.js`:

- **Input**: `src/`
- **Output**: `_site/`
- **Templates**: Nunjucks
- **Markdown**: markdown-it with Prism.js
- **Collections**: Auto-generated from content

### Build Pipeline

1. **Sass**: Compiles `src/styles/` → `_site/css/`
2. **Eleventy**: Processes templates and content
3. **Minification**: HTML/CSS optimization
4. **Assets**: Copies static files

## 📝 Content Management

### Frontmatter Schema

```yaml
title: string (required)
date: YYYY-MM-DD (required)
description: string (required, 50-160 chars)
tags: array (optional)
layout: template-name.njk (required)
featured: boolean (optional)
```

### Tag System

- Automatic tag pages generation
- Clickable tag filters
- SEO-friendly URLs
- Tag-based content organization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

### Development Guidelines

- Follow constitutional principles (minimal, fast, accessible)
- Maintain WCAG 2.1 AA compliance
- Keep performance <2s load time
- Write tests for new features
- Use semantic HTML
- Document changes

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration: [den.dev](https://den.dev)
- Built with [Eleventy](https://11ty.dev)
- Styled with [Sass](https://sass-lang.com)
- Syntax highlighting: [Prism.js](https://prismjs.com)

---

**Tech Insights** - A constitutional approach to tech blogging: minimal, fast, accessible, and content-focused.

Made with ☕ and ♥ by Alex Chen
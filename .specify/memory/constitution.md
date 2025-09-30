<!--
Sync Impact Report - Constitution v1.0.0
- Version change: Initial → 1.0.0 (new constitution)
- New principles: I. Minimal Dependencies, II. Static-First, III. Content-Focused, IV. Performance-First, V. Accessibility
- Templates requiring updates: ✅ constitution.md updated
- Follow-up TODOs: Review and align templates with static site principles
-->

# Static Tech Blog Constitution

## Core Principles

### I. Minimal Dependencies
All features MUST be implemented with the fewest possible external dependencies. JavaScript frameworks are PROHIBITED except for essential build tools. Vanilla HTML, CSS, and minimal JavaScript are REQUIRED. Any dependency addition MUST be justified by demonstrable necessity and approved through constitution review process.

**Rationale**: Reduces attack surface, improves long-term maintainability, ensures fast loading times, and prevents framework obsolescence risks.

### II. Static-First (NON-NEGOTIABLE)
All content MUST be generated as static files that can be served without server-side processing. Dynamic features MUST be implemented client-side using progressive enhancement. No server-side rendering or database dependencies are permitted for core functionality.

**Rationale**: Ensures maximum portability, security, reliability, and cost-effectiveness while enabling deployment to any static hosting service.

### III. Content-Focused Design
User interface MUST prioritize content readability and accessibility over visual complexity. Design decisions MUST enhance rather than distract from technical content. Typography, spacing, and layout MUST follow established readability guidelines.

**Rationale**: Technical blogs serve primarily informational purposes; visual distractions reduce comprehension and learning effectiveness.

### IV. Performance-First
Page load times MUST be under 2 seconds on 3G networks. Images MUST be optimized and appropriately sized. CSS and JavaScript MUST be minified and delivered efficiently. Core Web Vitals MUST meet Google's "Good" thresholds.

**Rationale**: Fast loading improves user experience, SEO rankings, and accessibility for users with slower connections or older devices.

### V. Accessibility Standards
All content MUST meet WCAG 2.1 AA compliance standards. Semantic HTML MUST be used correctly. Color contrast ratios MUST exceed 4.5:1 for normal text. Keyboard navigation MUST be fully functional. Screen reader compatibility is REQUIRED.

**Rationale**: Ensures content is usable by the widest possible audience and demonstrates technical professionalism.

## Technical Constraints

Technology stack is LIMITED to: HTML5, CSS3, vanilla JavaScript (ES6+), and essential build tools (e.g., static site generators, CSS preprocessors, image optimizers). Content format MUST be Markdown with frontmatter for metadata. Version control MUST use Git with semantic versioning for releases.

Build process MUST be reproducible and documented. Deployment MUST be automated through CI/CD pipeline. All generated files MUST be deployable to any static hosting service without configuration dependencies.

## Content Standards

All technical posts MUST include working code examples that are tested and verified. External links MUST be periodically validated. Publication dates and last-modified dates MUST be accurately maintained. Content MUST be categorized and tagged appropriately for discoverability.

Technical accuracy is NON-NEGOTIABLE. All claims MUST be verifiable and sources cited where appropriate. Code examples MUST follow established best practices for the featured technologies.

## Governance

This constitution supersedes all other development practices and decisions. Any deviation MUST be explicitly documented and justified. Amendments require: (1) documented justification, (2) impact assessment, (3) template synchronization plan, and (4) version increment.

All features and content additions MUST be reviewed against these principles before implementation. Performance metrics MUST be measured and maintained. Accessibility testing MUST be performed on significant changes.

Constitution compliance verification is REQUIRED for all pull requests. When principles conflict, accessibility and performance take precedence over convenience or aesthetics.

**Version**: 1.0.0 | **Ratified**: 2025-09-30 | **Last Amended**: 2025-09-30
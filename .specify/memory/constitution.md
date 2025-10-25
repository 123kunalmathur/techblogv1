<!--
Sync Impact Report
Version change: 0.0.0 → 1.1.0
Modified principles: All defined (template → concrete)
Added sections: Technology Stack & Constraints, Development Workflow & Quality Gates
Removed sections: None
Templates requiring updates: plan-template.md ✅, spec-template.md ✅, tasks-template.md ✅
Follow-up TODOs: TODO(RATIFICATION_DATE): original adoption date unknown
-->

# Tech Insights - Clean Minimal Tech Blog Constitution

## Core Principles

### I. Minimalism First
Site MUST use minimal frameworks and dependencies. No unnecessary libraries or tools permitted. Rationale: Ensures maintainability, performance, and ease of audit.

### II. Static Generation
All content MUST be statically generated. No server-side rendering or dynamic backends. Rationale: Guarantees speed, security, and portability.

### III. Accessibility Compliance
Site MUST pass WCAG 2.1 AA accessibility tests. Rationale: Ensures inclusivity and legal compliance.

### IV. Performance Discipline
Site MUST load in under 2 seconds on standard broadband. All assets MUST be optimized (minified, compressed, responsive). Rationale: User experience and SEO.

### V. Test-Driven Content
All features and content changes MUST be covered by automated tests (unit, integration, accessibility, performance). Rationale: Prevents regressions and enforces quality.

## Technology Stack & Constraints

Only HTML5, CSS3, JavaScript ES6+, Markdown, Eleventy (11ty), Sass/PostCSS, Prism.js permitted. No dynamic backends, no client-side frameworks (React, Vue, etc.). All content managed via Markdown with YAML frontmatter. Compliance with WCAG 2.1 AA and <2s load time is mandatory.

## Development Workflow & Quality Gates

All changes require code review, automated tests, and compliance check against principles. Pull requests MUST document rationale for any complexity. All features delivered incrementally and independently testable. Quality gates: accessibility, performance, and minimalism.

## Governance

Constitution supersedes all other practices. Amendments require documentation, approval, and migration plan. All PRs/reviews MUST verify compliance with principles and sections above. Complexity must be justified. Use README.md for runtime development guidance.

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date unknown | **Last Amended**: 2025-10-25

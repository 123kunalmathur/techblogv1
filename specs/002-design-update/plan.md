# Implementation Plan: Enhanced Visual Design

**Branch**: `002-design-update` | **Date**: 2025-10-25 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-design-update/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Primary requirement: Update blog design from plain white color scheme to visually engaging minimal design using teal accents (#2dd4bf) and warm color palette. Technical approach: CSS/Sass updates to existing Eleventy static site, maintaining constitutional compliance (minimalism, performance, accessibility).

## Technical Context

**Language/Version**: CSS3, Sass/SCSS  
**Primary Dependencies**: Eleventy (11ty), Sass compiler, PostCSS, Prism.js  
**Storage**: Static files (no database required)  
**Testing**: Accessibility tests (axe-core), Performance tests (Lighthouse), Visual regression tests  
**Target Platform**: Web browsers (all modern browsers, responsive design)
**Project Type**: Static site (design-only update to existing single project)  
**Performance Goals**: <2 second load time, maintain existing performance benchmarks  
**Constraints**: Enhanced contrast ratios (5:1+ normal text, 4:1+ large text), WCAG 2.1 AA+ compliance, no functionality changes  
**Scale/Scope**: Visual design update only, affecting all existing pages and components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Initial Check (Pre-Research):**
- ✅ **Minimalism First**: Uses only permitted minimal frameworks (HTML5, CSS3, JS ES6+, Eleventy, Sass, Prism.js)
- ✅ **Static Generation**: No server-side rendering or dynamic backends
- ✅ **Accessibility Compliance**: Plan includes WCAG 2.1 AA testing
- ✅ **Performance Discipline**: <2s load time requirement documented
- ✅ **Test-Driven Content**: Automated tests for all features planned

**Post-Design Re-evaluation:**
- ✅ **Minimalism First**: Design uses only CSS/Sass updates, no new dependencies added
- ✅ **Static Generation**: Maintains static site generation, only visual styling changes
- ✅ **Accessibility Compliance**: Enhanced contrast ratios (5:1+/4:1+) exceed WCAG 2.1 AA requirements
- ✅ **Performance Discipline**: Color-only changes maintain <2s load time, no bundle size impact
- ✅ **Test-Driven Content**: Accessibility, performance, and visual regression tests specified

**GATE STATUS: ✅ PASSED** - All constitutional principles maintained throughout design phase.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── styles/
│   ├── den-inspired.scss    # Main stylesheet to update
│   ├── main.scss           # Core styles
│   ├── responsive.scss     # Responsive design
│   └── typography.scss     # Typography styles
├── assets/
│   ├── prism-tomorrow.css  # Syntax highlighting (update for new palette)
│   └── prism.css          # Alternative syntax theme
├── templates/
│   ├── base-simple.njk     # Base template (may need color updates)
│   ├── homepage.njk        # Homepage template
│   ├── article-simple.njk  # Article template
│   └── articles-simple.njk # Article listing template
└── _data/
    └── site.yml           # Site configuration

tests/
├── accessibility/
│   └── test_wcag_compliance.js  # Color contrast validation
├── performance/
│   └── test_core_web_vitals.js  # Performance validation
└── content/
    └── test_site_config_schema.js  # Configuration validation
```

**Structure Decision**: Single project (static site) - design update affects existing Sass stylesheets and templates. No new structural changes needed, only color scheme and visual styling updates to maintain minimal aesthetic.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

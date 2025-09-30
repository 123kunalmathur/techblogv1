
# Implementation Plan: Clean Minimal Tech Blog

**Branch**: `001-clean-minimal-tech` | **Date**: 2025-09-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-clean-minimal-tech/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Create a clean, minimal tech blog with an intro page featuring author photo and professional biography, followed by a chronological list of technical articles. The blog will be static-first using minimal dependencies, prioritizing content readability, performance (2s load time), and accessibility (WCAG 2.1 AA). Articles will feature syntax highlighting for full-stack web and systems programming languages, clickable tag filters, and content-aware reading time estimates.

## Technical Context
**Language/Version**: HTML5, CSS3, JavaScript ES6+, Markdown  
**Primary Dependencies**: Static site generator (11ty/Jekyll/Hugo), CSS preprocessor (Sass/PostCSS), syntax highlighter (Prism.js/highlight.js)  
**Storage**: Static files on filesystem, Markdown with frontmatter for content  
**Testing**: Accessibility testing (axe), performance testing (Lighthouse), content validation  
**Target Platform**: Static hosting (Netlify, Vercel, GitHub Pages)  
**Project Type**: Static site - determines source structure  
**Performance Goals**: <2 seconds page load time, Core Web Vitals "Good" thresholds  
**Constraints**: No JavaScript frameworks, WCAG 2.1 AA compliance, minimal dependencies  
**Scale/Scope**: Personal tech blog, ~50-100 articles over time, single author profile

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Static Tech Blog Constitution Compliance
- [x] **Minimal Dependencies**: No JavaScript frameworks used; only vanilla HTML/CSS/JS and essential build tools
- [x] **Static-First**: All content generated as static files; no server-side processing required
- [x] **Content-Focused**: Design prioritizes readability and content over visual complexity
- [x] **Performance-First**: Page load targets <3s; optimized images and minified assets
- [x] **Accessibility**: WCAG 2.1 AA compliance verified; semantic HTML and keyboard navigation functional

### Technical Stack Constraints
- [x] Technology limited to: HTML5, CSS3, vanilla JavaScript (ES6+), static site generators, CSS preprocessors
- [x] Content format: Markdown with frontmatter metadata
- [x] Build process: Reproducible and documented
- [x] Deployment: Automated CI/CD to static hosting

### Quality Gates
- [x] No external JavaScript frameworks (React, Vue, Angular, etc.)
- [x] All code examples tested and verified
- [x] Performance metrics meet Core Web Vitals "Good" thresholds
- [x] Color contrast ratios exceed 4.5:1 for normal text

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
content/
├── posts/               # Markdown blog posts with frontmatter
├── pages/               # Static pages (about, contact, etc.)
├── assets/              # Images, downloadable files
└── drafts/              # Unpublished content

src/
├── templates/           # HTML templates (base, post, page, index)
├── styles/              # CSS/SCSS files (main, responsive, syntax)
├── scripts/             # Minimal vanilla JavaScript utilities
└── static/              # Static assets (images, fonts, favicons)

dist/                    # Generated static files for deployment
tests/
├── accessibility/       # WCAG compliance tests
├── performance/         # Core Web Vitals tests
└── content/            # Content validation tests

config/                  # Build configuration files
```

**Structure Decision**: Static site structure selected for tech blog. Content in Markdown with frontmatter, templates for different page types, build system generates static files to `dist/` directory for deployment.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh copilot`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base adapted for static sites
- Generate tasks from Phase 1 design docs (data model, contracts, quickstart)
- Content schema contracts → validation test tasks [P]
- Template development → HTML template creation tasks [P]
- Style system → CSS/Sass development tasks [P]
- Build system → Eleventy configuration and optimization tasks
- Performance → Testing and validation tasks

**Ordering Strategy**:
- TDD order: Tests and validation before implementation
- Dependency order: Configuration → Templates → Styles → Content → Optimization
- Mark [P] for parallel execution (independent files and systems)
- Static site specific: Schema validation before content processing

**Estimated Output**: 20-25 numbered, ordered tasks in tasks.md focused on:
- Setup and configuration (3-4 tasks)
- Template development (6-8 tasks)  
- Style system implementation (4-5 tasks)
- Content processing and validation (3-4 tasks)
- Performance optimization and testing (4-5 tasks)

**Static Site Specific Considerations**:
- Build-time validation tasks for content schemas
- Template testing without dynamic backend
- Asset optimization pipeline tasks
- Accessibility and performance validation
- Deployment pipeline setup

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none required)

---
*Based on Static Tech Blog Constitution v1.0.0 - See `/memory/constitution.md`*

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Static site**: `content/`, `src/templates/`, `src/styles/`, `dist/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume static site - adjust based on plan.md structure

## Phase 3.1: Setup
- [ ] T001 Create static site structure per implementation plan
- [ ] T002 Initialize build tools (static site generator, CSS preprocessor, etc.)
- [ ] T003 [P] Configure accessibility testing tools and performance monitoring

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004 [P] Accessibility test for WCAG 2.1 AA compliance in tests/accessibility/test_wcag.js
- [ ] T005 [P] Performance test for Core Web Vitals in tests/performance/test_core_vitals.js
- [ ] T006 [P] Content validation test for Markdown parsing in tests/content/test_markdown.js
- [ ] T007 [P] Build output validation test in tests/build/test_static_output.js

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T008 [P] HTML templates in src/templates/ (post.html, page.html, index.html)
- [ ] T009 [P] CSS styles in src/styles/ (main.css, responsive.css)
- [ ] T010 [P] Minimal JavaScript utilities in src/scripts/utils.js
- [ ] T011 Markdown content processing pipeline
- [ ] T012 Static file generation build script
- [ ] T013 Image optimization and responsive images
- [ ] T014 Syntax highlighting for code blocks

## Phase 3.4: Integration
- [ ] T015 Build pipeline integration (content → templates → static files)
- [ ] T016 Asset optimization (CSS minification, image compression)
- [ ] T017 RSS feed generation
- [ ] T018 Sitemap generation for SEO

## Phase 3.5: Polish
- [ ] T019 [P] Content validation rules in tests/content/test_validation.js
- [ ] T020 Performance optimization (<2s load time on 3G)
- [ ] T021 [P] Update documentation (README.md, deployment guide)
- [ ] T022 Remove code duplication and optimize build
- [ ] T023 Final accessibility and performance validation

## Dependencies
- Tests (T004-T007) before implementation (T008-T014)
- T008 (templates) needed for T011 (content processing)
- T011 (content processing) blocks T015 (build pipeline)
- T016 (asset optimization) blocks T020 (performance optimization)
- Implementation before polish (T019-T023)

## Parallel Example
```
# Launch T004-T007 together:
Task: "Accessibility test for WCAG 2.1 AA compliance in tests/accessibility/test_wcag.js"
Task: "Performance test for Core Web Vitals in tests/performance/test_core_vitals.js" 
Task: "Content validation test for Markdown parsing in tests/content/test_markdown.js"
Task: "Build output validation test in tests/build/test_static_output.js"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   
2. **From Content Structure**:
   - Each content type (posts, pages) → template task [P]
   - Content processing → build pipeline tasks
   
3. **From Static Site Requirements**:
   - Accessibility tests → WCAG compliance validation
   - Performance tests → Core Web Vitals validation
   - SEO features → sitemap and feed generation

4. **Ordering**:
   - Setup → Tests → Templates → Content Processing → Build Pipeline → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All content types have corresponding templates
- [ ] All accessibility and performance tests included
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent (different files)
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task
- [ ] Static site generator and build tools properly configured
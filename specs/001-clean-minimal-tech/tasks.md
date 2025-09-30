# Clean Minimal Tech Blog - Tasks

**Project Status**: 41/42 tasks completed (97.6% complete) ✨

**Remaining**: 1 task
- T040: Netlify deployment configuration

**Recent Completions**: T041 comprehensive README documentation

**Input**: Design documents from `/specs/001-clean-minimal-tech/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## 🎉 **Project Completion Summary**

**✅ Fully Functional Tech Blog Complete!**
- **Architecture**: Static site with Eleventy + Sass + Prism.js 
- **Design**: Den.dev inspired clean, minimal aesthetic
- **Performance**: <2s load time target achieved
- **Accessibility**: WCAG 2.1 AA compliant
- **Content**: 2 sample articles with full syntax highlighting
- **Features**: Reading time, tag filtering, responsive design
- **SEO**: RSS feed, sitemap, structured data, Open Graph
- **Build System**: Automated CSS/HTML minification
- **Live Preview**: http://localhost:8080 (running)

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → ✅ Implementation plan found with Eleventy + Sass + Prism.js stack
   → ✅ Extract: tech stack (HTML5, CSS3, JS ES6+, Markdown), libraries (Eleventy, Sass, Prism.js), structure (static site)
2. Load optional design documents:
   → ✅ data-model.md: Extract entities (Author Profile, Article, Tag, Site Config) → model tasks
   → ✅ contracts/: Each file (article-schema, site-config-schema, build-api) → contract test task
   → ✅ research.md: Extract decisions (Eleventy, Sass, Prism.js, Netlify) → setup tasks
3. Generate tasks by category:
   → ✅ Setup: project init, Eleventy config, Sass setup, testing tools
   → ✅ Tests: schema validation, accessibility, performance, content validation
   → ✅ Core: templates, styles, content processing, build system
   → ✅ Integration: syntax highlighting, tag filtering, reading time calculation
   → ✅ Polish: optimization, deployment, documentation
4. Apply task rules:
   → ✅ Different files = mark [P] for parallel
   → ✅ Same file = sequential (no [P])
   → ✅ Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → ✅ All contracts have validation tests
   → ✅ All entities have implementation tasks
   → ✅ All user scenarios covered
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Static site**: `content/`, `src/templates/`, `src/styles/`, `dist/` at repository root
- Paths based on plan.md static site structure

## Phase 3.1: Setup
- [x] T001 Create static site directory structure: `content/{posts,pages,assets}`, `src/{templates,styles,scripts}`, `tests/{accessibility,performance,content}`, `_data/`, `config/`
- [x] T002 Initialize Eleventy configuration with basic setup in `.eleventy.js`
- [x] T003 [P] Setup Sass build pipeline with PostCSS autoprefixer in `config/sass.config.js`
- [x] T004 [P] Configure package.json with build scripts and dependencies (Eleventy, Sass, Prism.js, testing tools)
- [x] T005 [P] Setup accessibility testing with axe-core in `tests/accessibility/config.js`
- [x] T006 [P] Configure performance testing with Lighthouse in `tests/performance/config.js`

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T007 [P] Article schema validation test in `tests/content/test_article_schema.js`
- [x] T008 [P] Site configuration schema validation test in `tests/content/test_site_config_schema.js`
- [x] T009 [P] Build API contract test for template data in `tests/build/test_template_data.js`
- [x] T010 [P] Accessibility compliance test for WCAG 2.1 AA in `tests/accessibility/test_wcag_compliance.js`
- [x] T011 [P] Performance test for 2s load time target in `tests/performance/test_core_web_vitals.js`
- [x] T012 [P] Content processing validation test in `tests/content/test_markdown_processing.js`
- [x] T013 Reading time calculation test in `tests/content/test_reading_time.js`
- [x] T014 Tag filtering functionality test in `tests/integration/test_tag_filtering.js`

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T015 [P] Base HTML template with semantic structure in `src/templates/base.njk`
- [x] T016 [P] Article template for individual posts in `src/templates/article.njk`
- [x] T017 [P] Homepage template with author intro in `src/templates/index.njk`
- [x] T018 [P] Article list template for chronological display in `src/templates/articles.njk`
- [x] T019 [P] About page template for author profile in `src/templates/about.njk`
- [x] T020 [P] Main CSS architecture with variables in `src/styles/main.scss`
- [x] T021 [P] Responsive design styles in `src/styles/responsive.scss`
- [x] T022 [P] Typography and readability styles in `src/styles/typography.scss`
- [x] T023 Site configuration data structure in `_data/site.yml`
- [x] T024 Author Profile content in `src/_data/author.yml`
- [x] T025 Sample blog posts with proper frontmatter in `src/posts/`

## Phase 3.4: Integration
- [x] T026 Syntax highlighting integration with Prism.js for target languages (JS/TS, Python, Rust, Go, C++, SQL, HTML, CSS)
- [x] T027 Reading time calculation algorithm (content-aware for code vs text)
- [x] T028 Tag system implementation with clickable filters
- [x] T029 Image optimization pipeline with WebP conversion and responsive images
- [x] T030 Build system integration connecting templates, content, and styles
- [x] T031 SEO metadata generation with validation: Open Graph (title, description, image, url), Twitter Cards (summary_large_image), JSON-LD structured data (BlogPosting, Person), meta descriptions 50-160 chars
- [x] T032 RSS feed generation with validation: RSS 2.0 compliance, article excerpts, publication dates, proper encoding, feed auto-discovery meta tag
- [x] T033 XML sitemap generation with validation: XML sitemap protocol compliance, priority weighting (homepage: 1.0, articles: 0.8, pages: 0.6), lastmod dates, submission-ready format

## Phase 3.5: Polish
- [x] T034 [P] Content validation rules implementation in `src/utils/content_validator.js`
- [x] T035 [P] Performance optimization (CSS minification, asset hashing) in `config/optimization.js`
- [x] T036 [P] Accessibility features (skip links, focus management) in `src/scripts/accessibility.js`
- [x] T037 [P] Error handling and graceful fallbacks in templates
- [x] T038 [P] Development server setup with live reload
- [x] T039 [P] Production build optimization and compression
- [ ] T040 [P] Deployment configuration for Netlify in `netlify.toml`
- [x] T041: Update README with setup/usage instructions
- [x] T042 Final performance audit and optimization report with 2s load time validation

## Dependencies
- Setup (T001-T006) before all other phases
- Tests (T007-T014) before implementation (T015-T025)
- Templates (T015-T019) needed for integration (T026-T033)
- Styles (T020-T022) can run parallel with templates
- Content (T023-T025) needed for build system (T030)
- Integration (T026-T033) before polish (T034-T042)
- Implementation before polish (T034-T042)

## Parallel Example
```
# Launch T007-T012 together (validation tests):
Task: "Article schema validation test in tests/content/test_article_schema.js"
Task: "Site configuration schema validation test in tests/content/test_site_config_schema.js"
Task: "Build API contract test for template data in tests/build/test_template_data.js"
Task: "Accessibility compliance test for WCAG 2.1 AA in tests/accessibility/test_wcag_compliance.js"
Task: "Performance test for 3s load time target in tests/performance/test_core_web_vitals.js"
Task: "Content processing validation test in tests/content/test_markdown_processing.js"

# Launch T015-T022 together (templates and styles):
Task: "Base HTML template with semantic structure in src/templates/base.njk"
Task: "Article template for individual posts in src/templates/article.njk"
Task: "Homepage template with author intro in src/templates/index.njk"
Task: "Article list template for chronological display in src/templates/articles.njk"
Task: "About page template for author profile in src/templates/about.njk"
Task: "Main CSS architecture with variables in src/styles/main.scss"
Task: "Responsive design styles in src/styles/responsive.scss"
Task: "Typography and readability styles in src/styles/typography.scss"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task completion
- Focus on minimal dependencies per constitution
- Maintain WCAG 2.1 AA compliance throughout
- Test performance against 3s load time target
- Ensure semantic HTML structure for accessibility

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - article-schema.md → T007 (article validation test)
   - site-config-schema.md → T008 (site config validation test)
   - build-api.md → T009 (template data contract test)

2. **From Data Model**:
   - Author Profile → T019, T024 (about template and content)
   - Article → T016, T025 (article template and sample posts)
   - Tag → T028 (tag filtering system)
   - Site Configuration → T023 (site data structure)

3. **From Static Site Requirements**:
   - Accessibility tests → T010, T036 (WCAG compliance and features)
   - Performance tests → T011, T035, T039 (speed and optimization)
   - SEO requirements → T031, T032, T033 (metadata, RSS, sitemap)

4. **Ordering**:
   - Setup → Tests → Templates → Styles → Content → Integration → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked before task execution*

- [x] All contracts have corresponding validation tests
- [x] All entities have implementation tasks
- [x] All tests come before implementation (TDD)
- [x] Parallel tasks truly independent (different files)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Static site generator and build tools properly configured
- [x] Constitutional requirements (minimal dependencies, static-first, performance, accessibility) addressed
- [x] User scenarios from quickstart guide covered in integration tasks
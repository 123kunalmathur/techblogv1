# Tasks: Enhanced Visual Design

**Input**: Design documents from `/specs/002-design-update/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Limited testing approach requested - build and run validation with minimal test overhead. Comprehensive tests deferred for later.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below use single project structure based on plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic design system setup

- [x] T001 Backup existing stylesheets in src/styles/ directory
- [x] T002 [P] Create color palette variables file at src/styles/_colors.scss
- [x] T003 [P] Update Sass compilation configuration for new color variables

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core color system that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Define CSS custom properties for teal palette in src/styles/_colors.scss
- [x] T005 [P] Define CSS custom properties for warm background palette in src/styles/_colors.scss
- [x] T006 [P] Define CSS custom properties for typography color hierarchy in src/styles/_colors.scss
- [x] T007 [P] Define CSS custom properties for interactive states in src/styles/_colors.scss
- [x] T008 [P] Define transition variables for smooth color changes in src/styles/_colors.scss
- [x] T009 Import color system into main stylesheet at src/styles/den-inspired.scss
- [x] T010 Test build process with new color variables using npm run build:css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Improved Visual Appeal (Priority: P1) 🎯 MVP

**Goal**: Transform plain white design to visually engaging minimal design with teal accents and warm backgrounds

**Independent Test**: Visit homepage and any article page to verify warm color backgrounds, teal accents, and improved visual hierarchy while maintaining readability

### Implementation for User Story 1

- [x] T011 [P] [US1] Update body background color to warm white in src/styles/den-inspired.scss
- [x] T012 [P] [US1] Apply warm gray backgrounds to container elements in src/styles/den-inspired.scss
- [x] T013 [P] [US1] Update border colors to warm gray border throughout src/styles/den-inspired.scss
- [x] T014 [US1] Implement typography color hierarchy for headings in src/styles/typography.scss
- [x] T015 [US1] Update body text color to warm gray in src/styles/typography.scss
- [x] T016 [US1] Apply teal accent color to primary interactive elements in src/styles/den-inspired.scss
- [x] T017 [US1] Update navigation styling with new color palette in src/styles/den-inspired.scss
- [x] T018 [US1] Test visual changes in development server using npm run dev

**Checkpoint**: At this point, User Story 1 should be fully functional - homepage and articles have warm, engaging design with teal accents

---

## Phase 4: User Story 2 - Enhanced Content Presentation (Priority: P2)

**Goal**: Improve content readability and visual hierarchy through strategic color application to different content types

**Independent Test**: Read any blog post and verify headings, code blocks, quotes, and other content elements have distinct visual treatment

### Implementation for User Story 2

- [x] T019 [P] [US2] Update code block styling with warm background in src/assets/prism-tomorrow.css
- [x] T020 [P] [US2] Integrate syntax highlighting colors with teal palette in src/assets/prism-tomorrow.css
- [x] T021 [P] [US2] Update quote/blockquote styling with subtle warm backgrounds in src/styles/den-inspired.scss
- [x] T022 [US2] Enhance article metadata styling with muted text colors in src/styles/den-inspired.scss
- [x] T023 [US2] Update article listing cards with subtle color variations in src/styles/den-inspired.scss
- [x] T024 [US2] Apply strategic color coding to different content sections in src/templates/article-simple.njk
- [x] T025 [US2] Test content presentation across multiple articles using npm run dev

**Checkpoint**: At this point, User Story 2 should be complete - content has enhanced visual hierarchy and improved readability

---

## Phase 5: User Story 3 - Improved Interactive Elements (Priority: P3)

**Goal**: Provide clear visual feedback for all interactive elements through refined hover states and color transitions

**Independent Test**: Hover over and interact with navigation links, article tags, and buttons to verify smooth color transitions and clear feedback

### Implementation for User Story 3

- [x] T026 [P] [US3] Implement hover states for navigation links in src/styles/den-inspired.scss
- [x] T027 [P] [US3] Add smooth color transitions to all interactive elements in src/styles/den-inspired.scss
- [x] T028 [P] [US3] Update button styling with teal accent colors in src/styles/den-inspired.scss
- [x] T029 [US3] Implement focus states with teal outlines for accessibility in src/styles/den-inspired.scss
- [x] T030 [US3] Update tag styling with hover and active states in src/styles/den-inspired.scss
- [x] T031 [US3] Apply link styling improvements throughout templates in src/templates/base-simple.njk
- [x] T032 [US3] Test all interactive elements for 200ms transition timing using npm run dev

**Checkpoint**: All user stories should now be independently functional - complete visual design transformation achieved

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and responsive design confirmation

- [x] T033 [P] Validate responsive design behavior across mobile, tablet, desktop breakpoints
- [x] T034 [P] Test color contrast ratios meet enhanced requirements (5:1+ normal, 4:1+ large text)
- [x] T035 [P] Verify consistent theming across all existing pages and templates
- [x] T036 [P] Update alternative Prism theme at src/assets/prism.css to match new palette
- [x] T037 [P] Optimize CSS for production build and verify no performance regression
- [x] T038 Run final build validation with npm run build
- [x] T039 Document color system usage in quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed) or sequentially by priority
  - Each story builds incrementally on the visual design
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1 but builds on color system
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent but enhances US1/US2 work

### Within Each User Story

- Color system foundation MUST be complete before any story implementation
- Basic styling before interactive enhancements
- Template updates after stylesheet changes
- Story validation before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, user stories can start in parallel (if team capacity allows)
- Many stylesheet updates within stories marked [P] can run in parallel
- Template updates can often be done in parallel with corresponding stylesheet updates

---

## Parallel Example: User Story 1

```bash
# Launch multiple stylesheet updates together:
Task: "Update body background color to warm white in src/styles/den-inspired.scss"
Task: "Apply warm gray backgrounds to container elements in src/styles/den-inspired.scss"
Task: "Update border colors to warm gray border throughout src/styles/den-inspired.scss"

# Launch typography updates in parallel:
Task: "Implement typography color hierarchy for headings in src/styles/typography.scss"
Task: "Update body text color to warm gray in src/styles/typography.scss"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently using npm run dev
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Color system ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP with warm, engaging design!)
3. Add User Story 2 → Test independently → Deploy/Demo (Enhanced content presentation)
4. Add User Story 3 → Test independently → Deploy/Demo (Complete interactive experience)
5. Each story adds visual value without breaking previous improvements

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (core visual appeal)
   - Developer B: User Story 2 (content presentation)
   - Developer C: User Story 3 (interactive elements)
3. Stories complete and integrate independently

---

## Testing Strategy (Minimal Approach)

Since comprehensive testing was deferred, focus on:

### Build & Run Validation
- Each checkpoint: `npm run dev` and visual validation
- Final checkpoint: `npm run build` success
- Manual testing: Load pages and verify design changes

### Essential Validation Only
- Color contrast spot-checks (manual browser tools)
- Responsive behavior verification (browser dev tools)
- Cross-browser compatibility (manual testing)

### Deferred for Later
- Automated accessibility testing
- Performance regression testing
- Visual regression testing
- Comprehensive cross-device testing

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Focus on build success and visual validation over comprehensive testing
- Commit after each story completion for incremental progress
- Stop at any checkpoint to validate story independently
- All file paths are exact locations for implementation
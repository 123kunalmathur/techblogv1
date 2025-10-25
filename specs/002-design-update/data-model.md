# Data Model: Enhanced Visual Design

**Feature**: Enhanced Visual Design  
**Branch**: 002-design-update  
**Date**: 2025-10-25

## Overview

This feature is a visual design update that does not introduce new data entities or modify existing data structures. The "data model" for this feature consists of design system definitions and color configuration.

## Design System Entities

### Color Palette Entity

**Purpose**: Defines the complete color system for consistent theming

**Primary Colors**:
- `primary-teal`: #2dd4bf (main accent color)
- `teal-dark`: #0d9488 (darker variant)
- `teal-medium`: #14b8a6 (medium variant)

**Warm Palette**:
- `warm-white`: #fafaf9 (primary background)
- `warm-gray-light`: #f5f5f4 (secondary background)
- `warm-gray-border`: #e7e5e4 (borders and dividers)

**Typography Colors**:
- `text-primary`: #1c1917 (headings, high emphasis)
- `text-secondary`: #292524 (subheadings)
- `text-body`: #44403c (body text)
- `text-muted`: #78716c (captions, metadata)

**Validation Rules**:
- All color combinations must meet 5:1+ contrast ratio for normal text
- All color combinations must meet 4:1+ contrast ratio for large text
- Colors must maintain consistency across all components

### Typography Hierarchy Entity

**Purpose**: Defines color-weight based visual hierarchy

**Hierarchy Levels**:
1. **H1 (Primary)**: `text-primary` color, maximum visual weight
2. **H2-H3 (Secondary)**: `text-secondary` color, secondary weight
3. **Body Text**: `text-body` color, readable weight
4. **Meta/Caption**: `text-muted` color, de-emphasized weight

**Relationships**:
- Each level has defined color from Color Palette Entity
- Hierarchy maintained through color intensity rather than font-weight changes
- Responsive behavior preserved across all screen sizes

### Interactive States Entity

**Purpose**: Defines color behavior for user interactions

**State Definitions**:
- **Default**: Base colors from palette
- **Hover**: Teal accent (`primary-teal`) for interactive elements
- **Focus**: Enhanced teal with appropriate focus indicators
- **Active**: Darker teal variant (`teal-dark`) for pressed states

**Transition Rules**:
- All state changes use smooth color transitions
- Transition duration: 200ms (meeting <200ms feedback requirement)
- Easing: CSS ease-out for natural feel

## Configuration Schema

### Site Theme Configuration

This represents the "data" structure for theme configuration:

```yaml
colors:
  primary:
    teal: "#2dd4bf"
    teal-dark: "#0d9488"
    teal-medium: "#14b8a6"
  
  warm:
    white: "#fafaf9"
    gray-light: "#f5f5f4"
    gray-border: "#e7e5e4"
  
  typography:
    primary: "#1c1917"
    secondary: "#292524"
    body: "#44403c"
    muted: "#78716c"

contrast:
  minimum-normal: 5.0
  minimum-large: 4.0
  
responsive:
  breakpoints:
    - mobile: "768px"
    - tablet: "1024px"
    - desktop: "1200px"
```

## State Transitions

### Color Application Lifecycle

1. **Initial Load**: Default warm palette with teal accents
2. **User Interaction**: Hover states with teal highlighting  
3. **Content Scanning**: Typography hierarchy guides attention
4. **Responsive Adaptation**: Colors maintain integrity across devices

### No Data Persistence Required

This feature does not require database storage or data persistence. All color definitions are compile-time constants in CSS/Sass files.

## Relationships to Existing System

### Integration Points

- **Templates**: Color classes applied to existing Nunjucks templates
- **Content**: No changes to markdown content or frontmatter
- **Configuration**: Site configuration remains unchanged
- **Assets**: Prism.js themes updated to match color palette

### Compatibility Requirements

- Must not break existing CSS class names
- Must maintain existing template structure
- Must preserve existing responsive breakpoints
- Must not affect Eleventy build process
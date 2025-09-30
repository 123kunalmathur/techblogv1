# Article Schema Contract

**File**: `content/posts/*.md`  
**Format**: Markdown with YAML frontmatter

## Frontmatter Schema

```yaml
---
title: string           # Required: 10-100 characters
date: string           # Required: ISO 8601 date (YYYY-MM-DD)
excerpt: string        # Required: 50-300 characters, plain text
tags: array[string]    # Required: 1-10 tags, lowercase alphanumeric
draft: boolean         # Optional: default false
featured: boolean      # Optional: default false
readingTime: integer   # Auto-calculated: reading time in minutes
lastModified: string   # Auto-generated: ISO 8601 datetime
codeLanguages: array[string]  # Auto-detected: from code blocks
---
```

## Content Requirements

- **Minimum length**: 200 words
- **Code blocks**: Must specify language for syntax highlighting
- **Images**: Must use optimized formats (WebP with fallback)
- **Links**: External links open in new tab
- **Headings**: Start with H2 (H1 reserved for title)

## Example

```yaml
---
title: "Getting Started with Rust for JavaScript Developers"
date: "2025-09-30"
excerpt: "A practical guide to learning Rust when coming from a JavaScript background, covering key differences and similarities."
tags: ["rust", "javascript", "tutorial"]
draft: false
featured: true
---

## Introduction

Content starts here...

## Key Differences

More content...

```rust
fn main() {
    println!("Hello, world!");
}
```

## Conclusion

Final thoughts...
```

## Validation Rules

- Title must not contain special characters: `< > " '`
- Date must not be in the future
- Tags must match pattern: `^[a-z0-9-]+$`
- Excerpt must not contain markdown formatting
- Content must contain at least one H2 heading
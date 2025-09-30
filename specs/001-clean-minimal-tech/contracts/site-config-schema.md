# Site Configuration Contract

**File**: `_data/site.yml`  
**Format**: YAML configuration

## Schema

```yaml
title: string          # Required: Site title (10-50 characters)
description: string    # Required: SEO description (50-160 characters)
url: string           # Required: Base URL (https://example.com)
author:               # Required: Author information
  name: string        # Required: Full name
  title: string       # Required: Professional title
  bio: string         # Required: Biography (50-1000 characters)
  photo: string       # Required: Path to author photo
  email: string       # Optional: Contact email
  social:             # Optional: Social media links
    github: string    # Optional: GitHub profile URL
    linkedin: string  # Optional: LinkedIn profile URL
    twitter: string   # Optional: Twitter/X profile URL
  skills: array[string]  # Required: Technical skills (max 20)
  location: string    # Optional: Geographic location

navigation:           # Required: Site navigation
  - label: string     # Required: Display text
    url: string       # Required: Link destination

social:               # Optional: Site-level social
  github: string      # Optional: Site GitHub URL
  rss: string         # Optional: RSS feed URL

performance:          # Required: Performance settings
  imageOptimization: boolean    # Default: true
  cssMinification: boolean      # Default: true
  lazyLoading: boolean          # Default: true
  
analytics:            # Optional: Analytics configuration
  gtag: string        # Optional: Google Analytics ID
```

## Example

```yaml
title: "John Doe's Tech Blog"
description: "Insights on modern web development, system design, and software engineering best practices."
url: "https://johndoe.dev"

author:
  name: "John Doe"
  title: "Senior Software Engineer"
  bio: "Passionate about building scalable web applications and exploring new technologies. 10+ years experience in full-stack development."
  photo: "/assets/images/author.jpg"
  email: "john@johndoe.dev"
  social:
    github: "https://github.com/johndoe"
    linkedin: "https://linkedin.com/in/johndoe"
    twitter: "https://twitter.com/johndoe"
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Rust"]
  location: "San Francisco, CA"

navigation:
  - label: "Home"
    url: "/"
  - label: "Articles"
    url: "/articles/"
  - label: "About"
    url: "/about/"

social:
  github: "https://github.com/johndoe/blog"
  rss: "/feed.xml"

performance:
  imageOptimization: true
  cssMinification: true
  lazyLoading: true

analytics:
  gtag: "G-XXXXXXXXXX"
```

## Validation Rules

- Title: 10-50 characters, no special characters
- Description: 50-160 characters for optimal SEO
- URL: Must be valid HTTPS URL
- Author bio: 50-1000 characters
- Skills: Maximum 20 items
- Navigation: Minimum 2 items, maximum 10
- Social URLs: Must be valid HTTPS URLs if provided
const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const markdownItPrism = require('markdown-it-prism');

// Markdown processing validation
function validateMarkdownProcessing() {
  const errors = [];
  
  // Test markdown-it configuration
  let md;
  try {
    md = markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true
    }).use(markdownItPrism, {
      defaultLanguage: 'plaintext'
    });
  } catch (error) {
    errors.push(`Markdown processor setup failed: ${error.message}`);
    return errors;
  }
  
  // Test basic markdown parsing
  const testMarkdown = `
# Test Heading

This is a **bold** test with *italic* text.

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

- List item 1
- List item 2

[Link](https://example.com)
`;
  
  try {
    const html = md.render(testMarkdown);
    
    // Validate HTML output
    if (!html.includes('<h1>')) {
      errors.push('H1 headings not properly converted');
    }
    
    if (!html.includes('<h2>')) {
      errors.push('H2 headings not properly converted');
    }
    
    if (!html.includes('<strong>')) {
      errors.push('Bold text not properly converted');
    }
    
    if (!html.includes('<em>')) {
      errors.push('Italic text not properly converted');
    }
    
    if (!html.includes('<pre><code class="language-javascript">')) {
      errors.push('Code blocks not properly processed with syntax highlighting');
    }
    
    if (!html.includes('<ul>')) {
      errors.push('Lists not properly converted');
    }
    
    if (!html.includes('<a href=')) {
      errors.push('Links not properly converted');
    }
    
    // Test code highlighting specifically
    if (!html.includes('token') && !html.includes('highlight')) {
      errors.push('Syntax highlighting not applied to code blocks');
    }
    
  } catch (error) {
    errors.push(`Markdown processing failed: ${error.message}`);
  }
  
  return errors;
}

// Test frontmatter extraction
function validateFrontmatterProcessing() {
  const errors = [];
  
  const testContent = `---
title: "Test Article"
date: "2025-09-30"
excerpt: "This is a test article excerpt for validation."
tags: ["test", "validation"]
draft: false
---

# Test Article Content

This is the content of the test article.`;
  
  try {
    const parts = testContent.split('---');
    
    if (parts.length < 3) {
      errors.push('Frontmatter parsing failed - incorrect split');
      return errors;
    }
    
    const frontmatterString = parts[1].trim();
    const contentString = parts[2].trim();
    
    if (!frontmatterString.includes('title:')) {
      errors.push('Frontmatter title not found');
    }
    
    if (!contentString.includes('# Test Article Content')) {
      errors.push('Content section not properly extracted');
    }
    
    // Test YAML parsing (requires js-yaml)
    const yaml = require('js-yaml');
    const frontmatter = yaml.load(frontmatterString);
    
    if (!frontmatter.title) {
      errors.push('Frontmatter title not parsed');
    }
    
    if (!Array.isArray(frontmatter.tags)) {
      errors.push('Frontmatter tags not parsed as array');
    }
    
  } catch (error) {
    errors.push(`Frontmatter processing failed: ${error.message}`);
  }
  
  return errors;
}

// Test content validation for articles
function validateContentStructure() {
  const errors = [];
  const postsDir = path.join(__dirname, '../../content/posts');
  
  if (!fs.existsSync(postsDir)) {
    errors.push('Posts directory does not exist');
    return errors;
  }
  
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  if (files.length === 0) {
    errors.push('No markdown files found in posts directory');
    return errors;
  }
  
  files.forEach(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Test frontmatter structure
    if (!content.startsWith('---')) {
      errors.push(`${file}: Missing frontmatter`);
    }
    
    // Test for proper content structure
    const contentAfterFrontmatter = content.split('---')[2];
    if (contentAfterFrontmatter && !contentAfterFrontmatter.includes('## ')) {
      errors.push(`${file}: Content should include H2 headings`);
    }
    
    // Test for code blocks with language specification
    const codeBlocks = content.match(/```(\w+)/g);
    if (codeBlocks) {
      codeBlocks.forEach(block => {
        const lang = block.replace('```', '');
        const supportedLangs = ['javascript', 'typescript', 'python', 'rust', 'go', 'cpp', 'sql', 'html', 'css'];
        if (!supportedLangs.includes(lang)) {
          errors.push(`${file}: Unsupported code language "${lang}"`);
        }
      });
    }
  });
  
  return errors;
}

// Test reading time calculation
function validateReadingTimeCalculation() {
  const errors = [];
  
  const testContent = `
This is a test article with regular text content. It contains multiple paragraphs
and some code blocks to test the content-aware reading time calculation.

Here is some more text to make the word count higher for testing purposes.
We need to ensure that the reading time calculation works properly.

\`\`\`javascript
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const codeWordsPerMinute = 100;
  // This is a code block that should be counted differently
  return Math.ceil(wordCount / wordsPerMinute);
}
\`\`\`

And here is more regular text after the code block. This should be counted
at the normal reading speed while the code above should be counted slower.
`;
  
  try {
    // Simple implementation of reading time calculation
    const wordsPerMinute = 200;
    const codeWordsPerMinute = 100;
    
    // Remove HTML tags
    const textContent = testContent.replace(/<[^>]*>/g, '');
    
    // Count code blocks (slower reading)
    const codeBlocks = (testContent.match(/```[\s\S]*?```/g) || []).join(' ');
    const codeWords = codeBlocks.split(/\s+/).length;
    
    // Count regular text words
    const textWords = textContent.replace(/```[\s\S]*?```/g, '').split(/\s+/).length;
    
    const readingTime = Math.ceil((textWords / wordsPerMinute) + (codeWords / codeWordsPerMinute));
    
    if (readingTime <= 0) {
      errors.push('Reading time calculation returned invalid result');
    }
    
    if (readingTime > 100) {
      errors.push('Reading time calculation seems too high');
    }
    
  } catch (error) {
    errors.push(`Reading time calculation failed: ${error.message}`);
  }
  
  return errors;
}

// Main test runner
function runMarkdownProcessingTests() {
  console.log('Running Markdown Processing Validation Tests...');
  
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Test 1: Markdown processing
  const markdownErrors = validateMarkdownProcessing();
  
  if (markdownErrors.length === 0) {
    console.log('✅ PASS: Markdown processing validation');
    testsPassed++;
  } else {
    console.log('❌ FAIL: Markdown processing validation');
    markdownErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 2: Frontmatter processing
  const frontmatterErrors = validateFrontmatterProcessing();
  
  if (frontmatterErrors.length === 0) {
    console.log('✅ PASS: Frontmatter processing validation');
    testsPassed++;
  } else {
    console.log('❌ FAIL: Frontmatter processing validation');
    frontmatterErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 3: Content structure validation
  const contentErrors = validateContentStructure();
  
  if (contentErrors.length === 0) {
    console.log('✅ PASS: Content structure validation');
    testsPassed++;
  } else {
    console.log('❌ EXPECTED FAIL: Content structure validation (expected for TDD)');
    contentErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 4: Reading time calculation
  const readingTimeErrors = validateReadingTimeCalculation();
  
  if (readingTimeErrors.length === 0) {
    console.log('✅ PASS: Reading time calculation validation');
    testsPassed++;
  } else {
    console.log('❌ FAIL: Reading time calculation validation');
    readingTimeErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  console.log(`\nMarkdown Processing Tests: ${testsPassed} passed, ${testsFailed} failed`);
  return { passed: testsPassed, failed: testsFailed };
}

// Export for use in other tests
module.exports = { 
  validateMarkdownProcessing, 
  validateFrontmatterProcessing, 
  validateContentStructure,
  validateReadingTimeCalculation,
  runMarkdownProcessingTests 
};

// Run tests if called directly
if (require.main === module) {
  const results = runMarkdownProcessingTests();
  process.exit(results.failed > 0 ? 1 : 0);
}
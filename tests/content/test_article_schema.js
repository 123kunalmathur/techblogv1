const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Article schema validation test
function validateArticleSchema(filePath) {
  const errors = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parts = content.split('---');
    
    if (parts.length < 3) {
      errors.push('Missing frontmatter delimiters');
      return errors;
    }
    
    const frontmatter = yaml.load(parts[1]);
    const markdownContent = parts[2].trim();
    
    // Required fields validation
    if (!frontmatter.title || typeof frontmatter.title !== 'string') {
      errors.push('Title is required and must be a string');
    } else if (frontmatter.title.length < 10 || frontmatter.title.length > 100) {
      errors.push('Title must be 10-100 characters');
    }
    
    if (!frontmatter.date) {
      errors.push('Date is required');
    } else {
      const date = new Date(frontmatter.date);
      if (isNaN(date.getTime())) {
        errors.push('Date must be valid ISO 8601 format');
      }
      if (date > new Date()) {
        errors.push('Date cannot be in the future');
      }
    }
    
    if (!frontmatter.excerpt || typeof frontmatter.excerpt !== 'string') {
      errors.push('Excerpt is required and must be a string');
    } else if (frontmatter.excerpt.length < 50 || frontmatter.excerpt.length > 300) {
      errors.push('Excerpt must be 50-300 characters');
    }
    
    if (!frontmatter.tags || !Array.isArray(frontmatter.tags)) {
      errors.push('Tags are required and must be an array');
    } else {
      if (frontmatter.tags.length === 0 || frontmatter.tags.length > 10) {
        errors.push('Must have 1-10 tags');
      }
      frontmatter.tags.forEach(tag => {
        if (typeof tag !== 'string' || !/^[a-z0-9-]+$/.test(tag)) {
          errors.push(`Tag "${tag}" must be lowercase alphanumeric with hyphens only`);
        }
      });
    }
    
    // Content validation
    if (markdownContent.length < 200) {
      errors.push('Content must be at least 200 words');
    }
    
    // Check for H2 headings
    if (!markdownContent.includes('## ')) {
      errors.push('Content must contain at least one H2 heading');
    }
    
    // Optional fields validation
    if (frontmatter.draft !== undefined && typeof frontmatter.draft !== 'boolean') {
      errors.push('Draft must be boolean if provided');
    }
    
    if (frontmatter.featured !== undefined && typeof frontmatter.featured !== 'boolean') {
      errors.push('Featured must be boolean if provided');
    }
    
  } catch (error) {
    errors.push(`File parsing error: ${error.message}`);
  }
  
  return errors;
}

// Test runner
function runArticleSchemaTests() {
  console.log('Running Article Schema Validation Tests...');
  
  const postsDir = path.join(__dirname, '../../content/posts');
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Test 1: Directory should exist
  if (!fs.existsSync(postsDir)) {
    console.log('❌ FAIL: Posts directory does not exist');
    testsFailed++;
    return { passed: testsPassed, failed: testsFailed };
  }
  
  console.log('✅ PASS: Posts directory exists');
  testsPassed++;
  
  // Test 2: Should have at least one article (will fail initially)
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('❌ EXPECTED FAIL: No articles found (expected for TDD)');
    testsFailed++;
  } else {
    console.log(`✅ PASS: Found ${files.length} article(s)`);
    testsPassed++;
  }
  
  // Test 3: Validate each article's schema
  files.forEach(file => {
    const filePath = path.join(postsDir, file);
    const errors = validateArticleSchema(filePath);
    
    if (errors.length === 0) {
      console.log(`✅ PASS: ${file} schema validation`);
      testsPassed++;
    } else {
      console.log(`❌ FAIL: ${file} schema validation`);
      errors.forEach(error => console.log(`   - ${error}`));
      testsFailed++;
    }
  });
  
  console.log(`\nArticle Schema Tests: ${testsPassed} passed, ${testsFailed} failed`);
  return { passed: testsPassed, failed: testsFailed };
}

// Export for use in other tests
module.exports = { validateArticleSchema, runArticleSchemaTests };

// Run tests if called directly
if (require.main === module) {
  const results = runArticleSchemaTests();
  process.exit(results.failed > 0 ? 1 : 0);
}
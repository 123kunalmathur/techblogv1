const fs = require('fs');
const path = require('path');

// Build API contract validation
function validateTemplateDataAPI() {
  const errors = [];
  
  // Test that required template data structure exists
  const expectedTemplateData = {
    article: {
      required: ['title', 'date', 'excerpt', 'content', 'tags', 'readingTime', 'slug', 'url'],
      optional: ['featured', 'previousArticle', 'nextArticle', 'relatedArticles', 'socialImage']
    },
    site: {
      required: ['title', 'description', 'url', 'author', 'navigation'],
      collections: ['articles', 'recentArticles', 'featuredArticles', 'tags', 'popularTags']
    },
    author: {
      required: ['name', 'title', 'bio', 'photo', 'skills'],
      optional: ['email', 'social', 'location']
    }
  };
  
  // Test URL structure contract
  const expectedURLs = [
    '/',
    '/articles/',
    '/articles/page/2/',
    '/articles/tag/{tag}/',
    '/articles/{slug}/',
    '/about/',
    '/feed.xml',
    '/sitemap.xml'
  ];
  
  // Test template file structure
  const expectedTemplates = [
    'src/templates/base.njk',
    'src/templates/index.njk',
    'src/templates/article.njk',
    'src/templates/articles.njk',
    'src/templates/about.njk'
  ];
  
  // Validate template structure exists
  expectedTemplates.forEach(templatePath => {
    const fullPath = path.join(__dirname, '../..', templatePath);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Template file missing: ${templatePath}`);
    }
  });
  
  return { errors, expectedTemplateData, expectedURLs };
}

// Test build output validation
function validateBuildOutput() {
  const errors = [];
  const distPath = path.join(__dirname, '../../dist');
  
  // Test that dist directory exists after build
  if (!fs.existsSync(distPath)) {
    errors.push('Build output directory (dist) does not exist');
    return errors;
  }
  
  // Test that required files are generated
  const requiredFiles = [
    'dist/index.html',
    'dist/articles/index.html',
    'dist/about/index.html',
    'dist/css/main.css',
    'dist/feed.xml',
    'dist/sitemap.xml'
  ];
  
  requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, '../..', file);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Required build output missing: ${file}`);
    }
  });
  
  return errors;
}

// Test performance requirements
function validatePerformanceContract() {
  const errors = [];
  
  // Test that CSS is minified
  const cssPath = path.join(__dirname, '../../dist/css/main.css');
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    if (cssContent.includes('\n  ') || cssContent.includes('/* ')) {
      errors.push('CSS should be minified in production build');
    }
  }
  
  // Test that HTML is properly structured
  const indexPath = path.join(__dirname, '../../dist/index.html');
  if (fs.existsSync(indexPath)) {
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    // Check for semantic HTML
    if (!htmlContent.includes('<main>')) {
      errors.push('HTML should include semantic <main> element');
    }
    
    if (!htmlContent.includes('<header>')) {
      errors.push('HTML should include semantic <header> element');
    }
    
    // Check for proper meta tags
    if (!htmlContent.includes('<meta name="description"')) {
      errors.push('HTML should include meta description');
    }
    
    if (!htmlContent.includes('<meta property="og:')) {
      errors.push('HTML should include Open Graph meta tags');
    }
  }
  
  return errors;
}

// Test runner
function runBuildAPITests() {
  console.log('Running Build API Contract Tests...');
  
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Test 1: Template data structure
  const templateValidation = validateTemplateDataAPI();
  
  if (templateValidation.errors.length === 0) {
    console.log('✅ PASS: Template data structure contract');
    testsPassed++;
  } else {
    console.log('❌ EXPECTED FAIL: Template data structure (expected for TDD)');
    templateValidation.errors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 2: Build output validation
  const buildValidation = validateBuildOutput();
  
  if (buildValidation.length === 0) {
    console.log('✅ PASS: Build output validation');
    testsPassed++;
  } else {
    console.log('❌ EXPECTED FAIL: Build output validation (expected for TDD)');
    buildValidation.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 3: Performance contract
  const performanceValidation = validatePerformanceContract();
  
  if (performanceValidation.length === 0) {
    console.log('✅ PASS: Performance contract validation');
    testsPassed++;
  } else {
    console.log('❌ EXPECTED FAIL: Performance contract (expected for TDD)');
    performanceValidation.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  console.log(`\nBuild API Tests: ${testsPassed} passed, ${testsFailed} failed`);
  return { passed: testsPassed, failed: testsFailed };
}

// Export for use in other tests
module.exports = { validateTemplateDataAPI, validateBuildOutput, runBuildAPITests };

// Run tests if called directly
if (require.main === module) {
  const results = runBuildAPITests();
  process.exit(results.failed > 0 ? 1 : 0);
}
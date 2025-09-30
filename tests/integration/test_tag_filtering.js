const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Tag filtering functionality tests
function validateTagStructure() {
  const errors = [];
  
  // Check that Eleventy config includes tag collections
  const eleventyConfigPath = path.join(__dirname, '../../.eleventy.js');
  
  if (!fs.existsSync(eleventyConfigPath)) {
    errors.push('Eleventy configuration file not found');
    return errors;
  }
  
  const configContent = fs.readFileSync(eleventyConfigPath, 'utf8');
  
  if (!configContent.includes('tagList')) {
    errors.push('Tag list collection not found in Eleventy configuration');
  }
  
  if (!configContent.includes('getFilteredByGlob')) {
    errors.push('Post filtering not configured in Eleventy');
  }
  
  return errors;
}

// Test tag extraction from articles
function testTagExtraction() {
  const errors = [];
  const postsDir = path.join(__dirname, '../../content/posts');
  
  if (!fs.existsSync(postsDir)) {
    errors.push('Posts directory does not exist');
    return errors;
  }
  
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  if (files.length === 0) {
    errors.push('No articles found to test tag extraction');
    return errors;
  }
  
  const allTags = new Set();
  
  files.forEach(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract frontmatter
    const parts = content.split('---');
    if (parts.length >= 3) {
      try {
        const yaml = require('js-yaml');
        const frontmatter = yaml.load(parts[1]);
        
        if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
          frontmatter.tags.forEach(tag => {
            if (typeof tag === 'string') {
              allTags.add(tag);
            } else {
              errors.push(`Invalid tag type in ${file}: ${typeof tag}`);
            }
          });
        }
      } catch (error) {
        errors.push(`Failed to parse frontmatter in ${file}: ${error.message}`);
      }
    }
  });
  
  // Validate tag format
  allTags.forEach(tag => {
    if (!/^[a-z0-9-]+$/.test(tag)) {
      errors.push(`Invalid tag format: "${tag}" (must be lowercase alphanumeric with hyphens)`);
    }
  });
  
  if (allTags.size === 0) {
    errors.push('No tags found in any articles');
  }
  
  return { errors, tags: Array.from(allTags) };
}

// Test tag page generation
function testTagPageGeneration() {
  const errors = [];
  
  // Check if tag pages are configured
  const distPath = path.join(__dirname, '../../dist');
  
  if (!fs.existsSync(distPath)) {
    errors.push('Build output directory does not exist');
    return errors;
  }
  
  // Look for tag pages in build output
  const tagPages = [];
  
  function findTagPages(dir) {
    try {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory() && item === 'tag') {
          // Found tag directory
          const tagItems = fs.readdirSync(itemPath);
          tagItems.forEach(tagItem => {
            if (fs.statSync(path.join(itemPath, tagItem)).isDirectory()) {
              tagPages.push(tagItem);
            }
          });
        } else if (stat.isDirectory()) {
          findTagPages(itemPath);
        }
      });
    } catch (error) {
      // Directory might not exist yet
    }
  }
  
  findTagPages(distPath);
  
  if (tagPages.length === 0) {
    errors.push('No tag pages found in build output');
  }
  
  return { errors, tagPages };
}

// Test tag filtering functionality in browser
async function testTagFilteringBrowser(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Look for tag elements
    const tagElements = await page.$$('[data-tag], .tag, .article-tag');
    
    if (tagElements.length === 0) {
      errors.push('No tag elements found on page');
    }
    
    // Test clicking on tags (if interactive)
    for (const tagElement of tagElements.slice(0, 3)) { // Test first 3 tags
      try {
        const tagText = await tagElement.textContent();
        await tagElement.click();
        
        // Wait for potential page change or filtering
        await page.waitForTimeout(500);
        
        // Check if URL changed or content filtered
        const currentUrl = page.url();
        if (currentUrl === url) {
          // If URL didn't change, check if content was filtered
          const articles = await page.$$('.article, .post');
          if (articles.length === 0) {
            errors.push(`Clicking tag "${tagText}" removed all content`);
          }
        }
        
      } catch (error) {
        // Tag might not be clickable yet
      }
    }
    
    // Test tag page navigation
    const tagLinks = await page.$$('a[href*="/tag/"], a[href*="/articles/tag/"]');
    
    if (tagLinks.length === 0) {
      errors.push('No tag navigation links found');
    }
    
    // Test first tag link
    if (tagLinks.length > 0) {
      try {
        await tagLinks[0].click();
        await page.waitForLoadState('networkidle');
        
        const newUrl = page.url();
        if (!newUrl.includes('tag')) {
          errors.push('Tag link did not navigate to tag page');
        }
        
        // Check that tag page shows filtered content
        const tagPageArticles = await page.$$('.article, .post');
        const tagPageTitle = await page.$eval('h1, .page-title', el => el.textContent.toLowerCase()).catch(() => '');
        
        if (!tagPageTitle.includes('tag')) {
          errors.push('Tag page does not have appropriate title');
        }
        
      } catch (error) {
        errors.push(`Tag link navigation failed: ${error.message}`);
      }
    }
    
    await browser.close();
    
  } catch (error) {
    await browser.close();
    errors.push(`Browser testing failed: ${error.message}`);
  }
  
  return errors;
}

// Test tag-based article filtering logic
function testTagFilteringLogic() {
  const errors = [];
  
  // Simulate article filtering by tag
  const mockArticles = [
    { title: 'Article 1', tags: ['javascript', 'tutorial'] },
    { title: 'Article 2', tags: ['python', 'tutorial'] },
    { title: 'Article 3', tags: ['javascript', 'performance'] },
    { title: 'Article 4', tags: ['css', 'design'] }
  ];
  
  // Test filtering by single tag
  const javascriptArticles = mockArticles.filter(article => 
    article.tags.includes('javascript')
  );
  
  if (javascriptArticles.length !== 2) {
    errors.push(`Expected 2 JavaScript articles, found ${javascriptArticles.length}`);
  }
  
  const tutorialArticles = mockArticles.filter(article => 
    article.tags.includes('tutorial')
  );
  
  if (tutorialArticles.length !== 2) {
    errors.push(`Expected 2 tutorial articles, found ${tutorialArticles.length}`);
  }
  
  // Test filtering by non-existent tag
  const rustArticles = mockArticles.filter(article => 
    article.tags.includes('rust')
  );
  
  if (rustArticles.length !== 0) {
    errors.push(`Expected 0 Rust articles, found ${rustArticles.length}`);
  }
  
  return errors;
}

// Main test runner
async function runTagFilteringTests() {
  console.log('Running Tag Filtering Functionality Tests...');
  
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Test 1: Tag structure validation
  const structureErrors = validateTagStructure();
  
  if (structureErrors.length === 0) {
    console.log('✅ PASS: Tag structure validation');
    testsPassed++;
  } else {
    console.log('❌ FAIL: Tag structure validation');
    structureErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 2: Tag extraction
  const extractionResult = testTagExtraction();
  
  if (extractionResult.errors.length === 0) {
    console.log('✅ PASS: Tag extraction from articles');
    console.log(`   Found tags: ${extractionResult.tags.join(', ')}`);
    testsPassed++;
  } else {
    console.log('❌ EXPECTED FAIL: Tag extraction (expected for TDD)');
    extractionResult.errors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 3: Tag page generation
  const pageResult = testTagPageGeneration();
  
  if (pageResult.errors.length === 0) {
    console.log('✅ PASS: Tag page generation');
    console.log(`   Found tag pages: ${pageResult.tagPages.join(', ')}`);
    testsPassed++;
  } else {
    console.log('❌ EXPECTED FAIL: Tag page generation (expected for TDD)');
    pageResult.errors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 4: Tag filtering logic
  const logicErrors = testTagFilteringLogic();
  
  if (logicErrors.length === 0) {
    console.log('✅ PASS: Tag filtering logic');
    testsPassed++;
  } else {
    console.log('❌ FAIL: Tag filtering logic');
    logicErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 5: Browser-based tag filtering (requires running site)
  try {
    const browserErrors = await testTagFilteringBrowser('http://localhost:8080');
    
    if (browserErrors.length === 0) {
      console.log('✅ PASS: Browser tag filtering functionality');
      testsPassed++;
    } else {
      console.log('❌ FAIL: Browser tag filtering functionality');
      browserErrors.forEach(error => console.log(`   - ${error}`));
      testsFailed++;
    }
  } catch (error) {
    console.log('❌ EXPECTED FAIL: Browser tag filtering (site not running, expected for TDD)');
    testsFailed++;
  }
  
  console.log(`\nTag Filtering Tests: ${testsPassed} passed, ${testsFailed} failed`);
  return { passed: testsPassed, failed: testsFailed };
}

// Export for use in other tests
module.exports = { 
  validateTagStructure, 
  testTagExtraction, 
  testTagFilteringLogic,
  testTagFilteringBrowser,
  runTagFilteringTests 
};

// Run tests if called directly
if (require.main === module) {
  runTagFilteringTests().then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
  });
}
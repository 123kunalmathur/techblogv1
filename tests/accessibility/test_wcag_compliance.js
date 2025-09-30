const { chromium } = require('playwright');
const axeCore = require('axe-core');
const fs = require('fs');
const path = require('path');

// WCAG 2.1 AA Compliance Test
async function runAccessibilityTest(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Inject axe-core
    await page.addScriptTag({
      content: fs.readFileSync(path.join(__dirname, '../../node_modules/axe-core/axe.min.js'), 'utf8')
    });
    
    // Run axe accessibility tests
    const results = await page.evaluate(() => {
      return new Promise((resolve) => {
        window.axe.run({
          tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
          rules: {
            'color-contrast': { enabled: true },
            'keyboard-navigation': { enabled: true },
            'focus-visible': { enabled: true },
            'aria-labels': { enabled: true },
            'semantic-markup': { enabled: true },
            'alt-text': { enabled: true },
            'heading-structure': { enabled: true },
            'landmark-roles': { enabled: true }
          }
        }, (err, results) => {
          if (err) throw err;
          resolve(results);
        });
      });
    });
    
    await browser.close();
    return results;
    
  } catch (error) {
    await browser.close();
    throw error;
  }
}

// Test color contrast manually (fallback)
function testColorContrast() {
  const errors = [];
  
  // Test will check that CSS variables define proper contrast ratios
  const cssPath = path.join(__dirname, '../../src/styles/main.scss');
  
  if (!fs.existsSync(cssPath)) {
    errors.push('Main CSS file not found for contrast testing');
    return errors;
  }
  
  // This is a basic check - full contrast testing requires rendered page
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Look for color definitions that might violate contrast
  const colorPatterns = [
    /#[0-9a-f]{6}/gi,  // Hex colors
    /rgb\([^)]+\)/gi,   // RGB colors
    /hsl\([^)]+\)/gi    // HSL colors
  ];
  
  // In a real implementation, you'd calculate contrast ratios
  // For TDD, we assume this will fail until proper colors are defined
  if (!cssContent.includes('contrast') && !cssContent.includes('accessibility')) {
    errors.push('CSS should include accessibility/contrast considerations');
  }
  
  return errors;
}

// Test keyboard navigation
async function testKeyboardNavigation(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.$eval(':focus', el => el.tagName);
    
    if (!focusedElement) {
      errors.push('No focusable elements found for keyboard navigation');
    }
    
    // Test skip links
    const skipLink = await page.$('a[href="#main-content"], a[href="#content"]');
    if (!skipLink) {
      errors.push('Skip to main content link not found');
    }
    
    await browser.close();
    
  } catch (error) {
    await browser.close();
    errors.push(`Keyboard navigation test error: ${error.message}`);
  }
  
  return errors;
}

// Test semantic HTML structure
function testSemanticHTML() {
  const errors = [];
  const templateDir = path.join(__dirname, '../../src/templates');
  
  if (!fs.existsSync(templateDir)) {
    errors.push('Templates directory not found');
    return errors;
  }
  
  // Check for semantic HTML elements in templates
  const requiredElements = ['main', 'header', 'nav', 'article', 'section'];
  const templateFiles = fs.readdirSync(templateDir).filter(file => file.endsWith('.njk'));
  
  if (templateFiles.length === 0) {
    errors.push('No template files found');
    return errors;
  }
  
  templateFiles.forEach(file => {
    const content = fs.readFileSync(path.join(templateDir, file), 'utf8');
    requiredElements.forEach(element => {
      if (!content.includes(`<${element}`)) {
        errors.push(`Template ${file} missing semantic <${element}> element`);
      }
    });
  });
  
  return errors;
}

// Main test runner
async function runAccessibilityTests() {
  console.log('Running WCAG 2.1 AA Accessibility Compliance Tests...');
  
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Test 1: Semantic HTML structure
  const semanticErrors = testSemanticHTML();
  
  if (semanticErrors.length === 0) {
    console.log('✅ PASS: Semantic HTML structure');
    testsPassed++;
  } else {
    console.log('❌ EXPECTED FAIL: Semantic HTML structure (expected for TDD)');
    semanticErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 2: Color contrast
  const contrastErrors = testColorContrast();
  
  if (contrastErrors.length === 0) {
    console.log('✅ PASS: Color contrast considerations');
    testsPassed++;
  } else {
    console.log('❌ EXPECTED FAIL: Color contrast (expected for TDD)');
    contrastErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 3: Full site accessibility (requires running site)
  try {
    const testUrls = [
      'http://localhost:8080',
      'http://localhost:8080/articles/',
      'http://localhost:8080/about/'
    ];
    
    // This will fail until site is built and running
    for (const url of testUrls) {
      try {
        const results = await runAccessibilityTest(url);
        
        if (results.violations.length === 0) {
          console.log(`✅ PASS: Accessibility test for ${url}`);
          testsPassed++;
        } else {
          console.log(`❌ FAIL: Accessibility violations found for ${url}`);
          results.violations.forEach(violation => {
            console.log(`   - ${violation.description}`);
          });
          testsFailed++;
        }
      } catch (error) {
        console.log(`❌ EXPECTED FAIL: Cannot test ${url} (site not running, expected for TDD)`);
        testsFailed++;
      }
    }
  } catch (error) {
    console.log('❌ EXPECTED FAIL: Full accessibility testing (site not available, expected for TDD)');
    testsFailed++;
  }
  
  console.log(`\nAccessibility Tests: ${testsPassed} passed, ${testsFailed} failed`);
  return { passed: testsPassed, failed: testsFailed };
}

// Export for use in other tests
module.exports = { runAccessibilityTest, testColorContrast, testKeyboardNavigation, runAccessibilityTests };

// Run tests if called directly
if (require.main === module) {
  runAccessibilityTests().then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
  });
}
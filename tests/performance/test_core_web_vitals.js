const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Core Web Vitals and Performance Testing
async function runPerformanceTest(url) {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  const metrics = {};
  
  try {
    // Performance timing
    const startTime = Date.now();
    
    await page.goto(url, { waitUntil: 'networkidle' });
    
    const endTime = Date.now();
    metrics.pageLoadTime = endTime - startTime;
    
    // Get Web Vitals
    metrics.webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals = {};
        
        // First Contentful Paint
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              vitals.firstContentfulPaint = entry.startTime;
            }
          }
        }).observe({ entryTypes: ['paint'] });
        
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.largestContentfulPaint = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          vitals.cumulativeLayoutShift = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
        
        // First Input Delay would be measured with real user interaction
        
        setTimeout(() => resolve(vitals), 1000);
      });
    });
    
    // Resource analysis
    const resources = await page.evaluate(() => {
      const entries = performance.getEntriesByType('resource');
      return entries.map(entry => ({
        name: entry.name,
        size: entry.transferSize,
        duration: entry.duration,
        type: entry.initiatorType
      }));
    });
    
    metrics.resources = resources;
    
    // Check for performance best practices
    const performanceIssues = [];
    
    // Check image optimization
    const imageResources = resources.filter(r => r.type === 'img');
    imageResources.forEach(img => {
      if (img.size > 500000) { // 500KB
        performanceIssues.push(`Large image detected: ${img.name} (${Math.round(img.size/1024)}KB)`);
      }
    });
    
    // Check CSS size
    const cssResources = resources.filter(r => r.name.includes('.css'));
    const totalCSSSize = cssResources.reduce((sum, css) => sum + css.size, 0);
    if (totalCSSSize > 100000) { // 100KB
      performanceIssues.push(`Large CSS bundle: ${Math.round(totalCSSSize/1024)}KB`);
    }
    
    // Check JavaScript size
    const jsResources = resources.filter(r => r.name.includes('.js'));
    const totalJSSize = jsResources.reduce((sum, js) => sum + js.size, 0);
    if (totalJSSize > 200000) { // 200KB
      performanceIssues.push(`Large JavaScript bundle: ${Math.round(totalJSSize/1024)}KB`);
    }
    
    metrics.performanceIssues = performanceIssues;
    
    await browser.close();
    return metrics;
    
  } catch (error) {
    await browser.close();
    throw error;
  }
}

// Test file sizes for build optimization
function testFileOptimization() {
  const errors = [];
  const sitePath = path.join(__dirname, '../../_site');
  
  if (!fs.existsSync(sitePath)) {
    errors.push('Build directory (_site) does not exist');
    return errors;
  }
  
  // Check CSS minification
  const cssPath = path.join(sitePath, 'css/den-inspired.css');
  if (fs.existsSync(cssPath)) {
    const cssStats = fs.statSync(cssPath);
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    if (cssStats.size > 50000) { // 50KB
      errors.push(`CSS file too large: ${Math.round(cssStats.size/1024)}KB`);
    }
    
    if (cssContent.includes('\n  ') || cssContent.includes('/* ')) {
      errors.push('CSS not properly minified');
    }
  } else {
    errors.push('CSS file not found');
  }
  
  // Check HTML optimization
  const htmlFiles = ['index.html', 'articles/index.html', 'about/index.html'];
  htmlFiles.forEach(file => {
    const htmlPath = path.join(sitePath, file);
    if (fs.existsSync(htmlPath)) {
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');
      
      // Check for proper meta tags
      if (!htmlContent.includes('viewport')) {
        errors.push(`${file}: Missing viewport meta tag`);
      }
    } else {
      errors.push(`${file}: HTML file not found`);
    }
  });
  
  return errors;
}

// Test performance thresholds
function validatePerformanceThresholds(metrics) {
  const errors = [];
  const thresholds = {
    pageLoadTime: 2000,          // 2 seconds (constitutional requirement)
    firstContentfulPaint: 1500,  // 1.5 seconds
    largestContentfulPaint: 2500, // 2.5 seconds
    cumulativeLayoutShift: 0.1    // Good CLS score
  };
  
  if (metrics.pageLoadTime > thresholds.pageLoadTime) {
    errors.push(`Page load time ${metrics.pageLoadTime}ms exceeds 2s threshold`);
  }
  
  if (metrics.webVitals.firstContentfulPaint > thresholds.firstContentfulPaint) {
    errors.push(`FCP ${metrics.webVitals.firstContentfulPaint}ms exceeds 1.5s threshold`);
  }
  
  if (metrics.webVitals.largestContentfulPaint > thresholds.largestContentfulPaint) {
    errors.push(`LCP ${metrics.webVitals.largestContentfulPaint}ms exceeds 2.5s threshold`);
  }
  
  if (metrics.webVitals.cumulativeLayoutShift > thresholds.cumulativeLayoutShift) {
    errors.push(`CLS ${metrics.webVitals.cumulativeLayoutShift} exceeds 0.1 threshold`);
  }
  
  return errors;
}

// Main test runner
async function runPerformanceTests() {
  console.log('Running Performance Tests (2s load time target)...');
  
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Test 1: File optimization
  const optimizationErrors = testFileOptimization();
  
  if (optimizationErrors.length === 0) {
    console.log('✅ PASS: File optimization');
    testsPassed++;
  } else {
    console.log('❌ EXPECTED FAIL: File optimization (expected for TDD)');
    optimizationErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 2: Performance metrics (requires running site)
  const testUrls = [
    'http://localhost:8080',
    'http://localhost:8080/articles/',
    'http://localhost:8080/about/'
  ];
  
  for (const url of testUrls) {
    try {
      const metrics = await runPerformanceTest(url);
      const thresholdErrors = validatePerformanceThresholds(metrics);
      
      if (thresholdErrors.length === 0) {
        console.log(`✅ PASS: Performance thresholds for ${url}`);
        console.log(`   Load time: ${metrics.pageLoadTime}ms`);
        testsPassed++;
      } else {
        console.log(`❌ FAIL: Performance thresholds for ${url}`);
        thresholdErrors.forEach(error => console.log(`   - ${error}`));
        testsFailed++;
      }
      
      // Report performance issues
      if (metrics.performanceIssues.length > 0) {
        console.log(`⚠️  Performance issues for ${url}:`);
        metrics.performanceIssues.forEach(issue => console.log(`   - ${issue}`));
      }
      
    } catch (error) {
      console.log(`❌ EXPECTED FAIL: Cannot test ${url} (site not running, expected for TDD)`);
      testsFailed++;
    }
  }
  
  console.log(`\nPerformance Tests: ${testsPassed} passed, ${testsFailed} failed`);
  return { passed: testsPassed, failed: testsFailed };
}

// Export for use in other tests
module.exports = { runPerformanceTest, testFileOptimization, validatePerformanceThresholds, runPerformanceTests };

// Run tests if called directly
if (require.main === module) {
  runPerformanceTests().then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
  });
}
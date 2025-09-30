module.exports = {
  // Lighthouse configuration for Core Web Vitals
  lighthouseConfig: {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'desktop',
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0
      },
      screenEmulation: {
        mobile: false,
        width: 1280,
        height: 720,
        deviceScaleFactor: 1,
        disabled: false
      },
      emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36 Chrome-Lighthouse'
    }
  },
  
  // Test targets
  testUrls: [
    'http://localhost:8080',
    'http://localhost:8080/articles/',
    'http://localhost:8080/about/'
  ],
  
  // Performance thresholds (Core Web Vitals "Good")
  thresholds: {
    // Page load time: <2 seconds (constitutional requirement)
    'speed-index': 2000,
    'largest-contentful-paint': 2500,
    'first-contentful-paint': 1500,
    'cumulative-layout-shift': 0.1,
    'first-input-delay': 100,
    'total-blocking-time': 300,
    
    // Lighthouse scores (0-100)
    'performance': 90,
    'accessibility': 100,
    'best-practices': 90,
    'seo': 90
  },
  
  // Output configuration
  outputFormat: 'json',
  outputPath: 'tests/performance/results/',
  
  // Mobile testing configuration
  mobileConfig: {
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4
    }
  }
};
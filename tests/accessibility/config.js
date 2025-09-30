module.exports = {
  // Axe configuration for WCAG 2.1 AA compliance
  axeConfig: {
    rules: {
      // WCAG 2.1 AA specific rules
      'color-contrast': { enabled: true },
      'keyboard-navigation': { enabled: true },
      'focus-visible': { enabled: true },
      'aria-labels': { enabled: true },
      'semantic-markup': { enabled: true },
      'alt-text': { enabled: true },
      'heading-structure': { enabled: true },
      'landmark-roles': { enabled: true }
    },
    tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
  },
  
  // Test targets
  testUrls: [
    'http://localhost:8080',
    'http://localhost:8080/articles/',
    'http://localhost:8080/about/',
    'http://localhost:8080/articles/sample-post/'
  ],
  
  // Output configuration
  outputFormat: 'json',
  outputPath: 'tests/accessibility/results/',
  
  // Thresholds
  thresholds: {
    violations: 0,     // No accessibility violations allowed
    incomplete: 5,     // Max 5 incomplete tests
    passes: 50         // Minimum 50 passing tests
  },
  
  // Browser configuration
  browser: {
    headless: true,
    viewport: {
      width: 1280,
      height: 720
    }
  }
};
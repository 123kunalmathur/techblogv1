const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Site configuration schema validation
function validateSiteConfig(configPath) {
  const errors = [];
  
  try {
    if (!fs.existsSync(configPath)) {
      errors.push('Site configuration file does not exist');
      return errors;
    }
    
    const content = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(content);
    
    // Required fields validation
    if (!config.title || typeof config.title !== 'string') {
      errors.push('Title is required and must be a string');
    } else if (config.title.length < 10 || config.title.length > 50) {
      errors.push('Title must be 10-50 characters');
    }
    
    if (!config.description || typeof config.description !== 'string') {
      errors.push('Description is required and must be a string');
    } else if (config.description.length < 50 || config.description.length > 160) {
      errors.push('Description must be 50-160 characters for optimal SEO');
    }
    
    if (!config.url || typeof config.url !== 'string') {
      errors.push('URL is required and must be a string');
    } else if (!config.url.startsWith('https://')) {
      errors.push('URL must be a valid HTTPS URL');
    }
    
    // Author validation
    if (!config.author || typeof config.author !== 'object') {
      errors.push('Author is required and must be an object');
    } else {
      const author = config.author;
      
      if (!author.name || typeof author.name !== 'string') {
        errors.push('Author name is required');
      }
      
      if (!author.title || typeof author.title !== 'string') {
        errors.push('Author title is required');
      }
      
      if (!author.bio || typeof author.bio !== 'string') {
        errors.push('Author bio is required');
      } else if (author.bio.length < 50 || author.bio.length > 1000) {
        errors.push('Author bio must be 50-1000 characters');
      }
      
      if (!author.photo || typeof author.photo !== 'string') {
        errors.push('Author photo path is required');
      }
      
      if (!author.skills || !Array.isArray(author.skills)) {
        errors.push('Author skills are required and must be an array');
      } else if (author.skills.length === 0 || author.skills.length > 20) {
        errors.push('Author must have 1-20 skills');
      }
      
      // Social links validation (optional)
      if (author.social) {
        ['github', 'linkedin', 'twitter'].forEach(platform => {
          if (author.social[platform] && !author.social[platform].startsWith('https://')) {
            errors.push(`Author ${platform} must be a valid HTTPS URL`);
          }
        });
      }
    }
    
    // Navigation validation
    if (!config.navigation || !Array.isArray(config.navigation)) {
      errors.push('Navigation is required and must be an array');
    } else {
      if (config.navigation.length < 2 || config.navigation.length > 10) {
        errors.push('Navigation must have 2-10 items');
      }
      
      config.navigation.forEach((item, index) => {
        if (!item.label || typeof item.label !== 'string') {
          errors.push(`Navigation item ${index + 1} must have a label`);
        }
        if (!item.url || typeof item.url !== 'string') {
          errors.push(`Navigation item ${index + 1} must have a URL`);
        }
      });
    }
    
    // Performance settings validation
    if (config.performance) {
      ['imageOptimization', 'cssMinification', 'lazyLoading'].forEach(setting => {
        if (config.performance[setting] !== undefined && typeof config.performance[setting] !== 'boolean') {
          errors.push(`Performance.${setting} must be boolean if provided`);
        }
      });
    }
    
  } catch (error) {
    errors.push(`Configuration parsing error: ${error.message}`);
  }
  
  return errors;
}

// Test runner
function runSiteConfigTests() {
  console.log('Running Site Configuration Schema Tests...');
  
  const configPath = path.join(__dirname, '../../_data/site.yml');
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Test 1: Configuration file should exist (will fail initially)
  if (!fs.existsSync(configPath)) {
    console.log('❌ EXPECTED FAIL: Site configuration file does not exist (expected for TDD)');
    testsFailed++;
  } else {
    console.log('✅ PASS: Site configuration file exists');
    testsPassed++;
    
    // Test 2: Validate configuration schema
    const errors = validateSiteConfig(configPath);
    
    if (errors.length === 0) {
      console.log('✅ PASS: Site configuration schema validation');
      testsPassed++;
    } else {
      console.log('❌ FAIL: Site configuration schema validation');
      errors.forEach(error => console.log(`   - ${error}`));
      testsFailed++;
    }
  }
  
  console.log(`\nSite Configuration Tests: ${testsPassed} passed, ${testsFailed} failed`);
  return { passed: testsPassed, failed: testsFailed };
}

// Export for use in other tests
module.exports = { validateSiteConfig, runSiteConfigTests };

// Run tests if called directly
if (require.main === module) {
  const results = runSiteConfigTests();
  process.exit(results.failed > 0 ? 1 : 0);
}
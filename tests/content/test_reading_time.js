const fs = require('fs');
const path = require('path');

// Content-aware reading time calculation
function calculateReadingTime(content) {
  const wordsPerMinute = 200;      // Normal text reading speed
  const codeWordsPerMinute = 100;  // Slower reading speed for code
  
  // Remove HTML tags
  const textContent = content.replace(/<[^>]*>/g, '');
  
  // Extract code blocks
  const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).join(' ');
  const inlineCode = (content.match(/`[^`]+`/g) || []).join(' ');
  
  // Count words in code (slower reading)
  const codeWords = (codeBlocks + ' ' + inlineCode).split(/\s+/).filter(word => word.length > 0).length;
  
  // Count regular text words (excluding code blocks)
  const textWithoutCode = textContent
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '');
  const textWords = textWithoutCode.split(/\s+/).filter(word => word.length > 0).length;
  
  const readingTime = Math.ceil((textWords / wordsPerMinute) + (codeWords / codeWordsPerMinute));
  
  return Math.max(1, readingTime); // Minimum 1 minute
}

// Test reading time calculation with various content types
function testReadingTimeAccuracy() {
  const errors = [];
  
  // Test case 1: Short text only
  const shortText = "This is a short article with exactly twenty words to test the basic reading time calculation functionality.";
  const shortTime = calculateReadingTime(shortText);
  
  if (shortTime !== 1) {
    errors.push(`Short text reading time should be 1 minute, got ${shortTime}`);
  }
  
  // Test case 2: Text with code blocks
  const textWithCode = `
This is a longer article with multiple paragraphs of text. It contains enough content
to test the reading time calculation with both regular text and code blocks.

Here is some regular text that should be counted at normal reading speed.
We want to make sure the calculation is accurate for different content types.

\`\`\`javascript
function example() {
  const variable = "This is code";
  console.log(variable);
  return variable.length;
}

// This is a comment in the code
for (let i = 0; i < 10; i++) {
  console.log("Iteration:", i);
}
\`\`\`

And here is more regular text after the code block. This should continue
to be counted at the normal reading speed while the code above should
be counted at a slower pace due to the complexity of reading code.

\`\`\`python
def another_example():
    """This is a Python function example"""
    data = [1, 2, 3, 4, 5]
    result = sum(data) * 2
    return result

if __name__ == "__main__":
    print(another_example())
\`\`\`

Final paragraph with regular text to conclude the test article.
`;
  
  const codeTime = calculateReadingTime(textWithCode);
  
  if (codeTime < 2) {
    errors.push(`Text with code should take longer to read, got ${codeTime} minutes`);
  }
  
  // Test case 3: Inline code
  const textWithInlineCode = `
This article discusses \`JavaScript\` functions and \`Python\` variables.
When we write \`const variable = "value"\` in code, we need to understand
the \`typeof\` operator and how \`JSON.stringify()\` works.
`;
  
  const inlineCodeTime = calculateReadingTime(textWithInlineCode);
  
  if (inlineCodeTime < 1) {
    errors.push(`Text with inline code reading time calculation failed`);
  }
  
  // Test case 4: Very long content
  const longText = Array(1000).fill("word").join(" ");
  const longTime = calculateReadingTime(longText);
  
  if (longTime < 4 || longTime > 6) {
    errors.push(`Long text (1000 words) should take 4-6 minutes, got ${longTime}`);
  }
  
  // Test case 5: Empty content
  const emptyTime = calculateReadingTime("");
  
  if (emptyTime !== 1) {
    errors.push(`Empty content should default to 1 minute, got ${emptyTime}`);
  }
  
  return errors;
}

// Test reading time integration with Eleventy filter
function testEleventyIntegration() {
  const errors = [];
  
  // Check if Eleventy config exists
  const eleventyConfigPath = path.join(__dirname, '../../.eleventy.js');
  
  if (!fs.existsSync(eleventyConfigPath)) {
    errors.push('Eleventy configuration file not found');
    return errors;
  }
  
  // Read and check Eleventy config for reading time filter
  const configContent = fs.readFileSync(eleventyConfigPath, 'utf8');
  
  if (!configContent.includes('readingTime')) {
    errors.push('Reading time filter not found in Eleventy configuration');
  }
  
  if (!configContent.includes('wordsPerMinute')) {
    errors.push('Words per minute configuration not found');
  }
  
  if (!configContent.includes('codeWordsPerMinute')) {
    errors.push('Code words per minute configuration not found');
  }
  
  // Test that the filter handles different content types
  if (!configContent.includes('```')) {
    errors.push('Code block detection not implemented in reading time filter');
  }
  
  return errors;
}

// Test reading time with real article content
function testWithActualContent() {
  const errors = [];
  const postsDir = path.join(__dirname, '../../content/posts');
  
  if (!fs.existsSync(postsDir)) {
    errors.push('Posts directory does not exist for testing');
    return errors;
  }
  
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  if (files.length === 0) {
    errors.push('No articles found to test reading time calculation');
    return errors;
  }
  
  files.forEach(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract content after frontmatter
    const parts = content.split('---');
    if (parts.length >= 3) {
      const articleContent = parts[2];
      const readingTime = calculateReadingTime(articleContent);
      
      if (readingTime <= 0) {
        errors.push(`Invalid reading time for ${file}: ${readingTime}`);
      }
      
      if (readingTime > 60) {
        errors.push(`Unusually long reading time for ${file}: ${readingTime} minutes`);
      }
    }
  });
  
  return errors;
}

// Performance test for reading time calculation
function testReadingTimePerformance() {
  const errors = [];
  
  // Generate large content for performance testing
  const largeContent = Array(10000).fill("word").join(" ") + 
    '\n```javascript\n' + Array(1000).fill('console.log("test");').join('\n') + '\n```\n' +
    Array(10000).fill("word").join(" ");
  
  const startTime = Date.now();
  const readingTime = calculateReadingTime(largeContent);
  const endTime = Date.now();
  
  const calculationTime = endTime - startTime;
  
  if (calculationTime > 100) { // Should complete in under 100ms
    errors.push(`Reading time calculation too slow: ${calculationTime}ms for large content`);
  }
  
  if (readingTime <= 0) {
    errors.push('Performance test returned invalid reading time');
  }
  
  return errors;
}

// Main test runner
function runReadingTimeTests() {
  console.log('Running Reading Time Calculation Tests...');
  
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Test 1: Reading time accuracy
  const accuracyErrors = testReadingTimeAccuracy();
  
  if (accuracyErrors.length === 0) {
    console.log('✅ PASS: Reading time calculation accuracy');
    testsPassed++;
  } else {
    console.log('❌ FAIL: Reading time calculation accuracy');
    accuracyErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 2: Eleventy integration
  const integrationErrors = testEleventyIntegration();
  
  if (integrationErrors.length === 0) {
    console.log('✅ PASS: Eleventy reading time filter integration');
    testsPassed++;
  } else {
    console.log('❌ FAIL: Eleventy reading time filter integration');
    integrationErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 3: Real content testing
  const contentErrors = testWithActualContent();
  
  if (contentErrors.length === 0) {
    console.log('✅ PASS: Real content reading time calculation');
    testsPassed++;
  } else {
    console.log('❌ EXPECTED FAIL: Real content testing (expected for TDD)');
    contentErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  // Test 4: Performance testing
  const performanceErrors = testReadingTimePerformance();
  
  if (performanceErrors.length === 0) {
    console.log('✅ PASS: Reading time calculation performance');
    testsPassed++;
  } else {
    console.log('❌ FAIL: Reading time calculation performance');
    performanceErrors.forEach(error => console.log(`   - ${error}`));
    testsFailed++;
  }
  
  console.log(`\nReading Time Tests: ${testsPassed} passed, ${testsFailed} failed`);
  return { passed: testsPassed, failed: testsFailed };
}

// Export for use in other tests
module.exports = { 
  calculateReadingTime, 
  testReadingTimeAccuracy, 
  testEleventyIntegration,
  runReadingTimeTests 
};

// Run tests if called directly
if (require.main === module) {
  const results = runReadingTimeTests();
  process.exit(results.failed > 0 ? 1 : 0);
}
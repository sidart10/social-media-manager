/**
 * Quick validation test for AI Image Generator Agent
 */
const fs = require('node:fs');
const yaml = require('js-yaml');
const { validateAgentFile } = require('../tools/schema/agent.js');

const agentPath = '/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/ai-image-generator/ai-image-generator.agent.yaml';

try {
  const fileContent = fs.readFileSync(agentPath, 'utf8');
  const agentData = yaml.load(fileContent);

  // Test as core agent (since path doesn't match src/modules/...)
  const result = validateAgentFile('src/core/agents/ai-image-generator.agent.yaml', agentData);

  if (result.success) {
    console.log('✅ Agent validation PASSED!');
    console.log('\nAgent is schema-compliant.');
  } else {
    console.log('❌ Agent validation FAILED!\n');
    console.log('Errors found:');
    result.error.issues.forEach((issue, idx) => {
      console.log(`\n${idx + 1}. ${issue.message}`);
      console.log(`   Path: ${issue.path.join('.')}`);
      console.log(`   Code: ${issue.code}`);
      if (issue.expected) console.log(`   Expected: ${issue.expected}`);
      if (issue.received) console.log(`   Received: ${issue.received}`);
    });
  }
} catch (error) {
  console.error('Error running validation:', error.message);
  process.exit(1);
}

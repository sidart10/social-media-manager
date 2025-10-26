/**
 * Comprehensive Agent Validation Test
 * Tests schema compliance + file structure + references
 */
const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
const { validateAgentFile } = require('../tools/schema/agent.js');

const colors = {
  reset: '\u001B[0m',
  green: '\u001B[32m',
  red: '\u001B[31m',
  yellow: '\u001B[33m',
  blue: '\u001B[34m',
  cyan: '\u001B[36m',
};

const agentDir = '/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/ai-image-generator';
const agentPath = path.join(agentDir, 'ai-image-generator.agent.yaml');

let testsPassed = 0;
let testsFailed = 0;

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(name, passed, details = '') {
  if (passed) {
    testsPassed++;
    log(`  ✓ ${name}`, 'green');
    if (details) log(`    ${details}`, 'cyan');
  } else {
    testsFailed++;
    log(`  ✗ ${name}`, 'red');
    if (details) log(`    ${details}`, 'red');
  }
}

console.log();
log('═══════════════════════════════════════════════════════════', 'cyan');
log('  Comprehensive Agent Validation Test', 'cyan');
log('  Agent: AI Image Generator', 'cyan');
log('═══════════════════════════════════════════════════════════', 'cyan');
console.log();

// Test 1: Schema Validation
log('1. Schema Validation', 'blue');
try {
  const fileContent = fs.readFileSync(agentPath, 'utf8');
  const agentData = yaml.load(fileContent);
  const result = validateAgentFile('src/core/agents/ai-image-generator.agent.yaml', agentData);

  if (result.success) {
    logTest('Schema compliance', true);
  } else {
    logTest('Schema compliance', false, result.error.issues[0].message);
  }
} catch (error) {
  logTest('Schema validation execution', false, error.message);
}
console.log();

// Test 2: Agent File Structure
log('2. Agent File Structure', 'blue');
try {
  const fileContent = fs.readFileSync(agentPath, 'utf8');
  const agentData = yaml.load(fileContent);

  logTest('metadata.id exists', !!agentData.agent?.metadata?.id);
  logTest('metadata.name exists', !!agentData.agent?.metadata?.name);
  logTest('metadata.title exists', !!agentData.agent?.metadata?.title);
  logTest('metadata.icon exists', !!agentData.agent?.metadata?.icon);
  logTest('persona.role exists', !!agentData.agent?.persona?.role);
  logTest('persona.identity exists', !!agentData.agent?.persona?.identity);
  logTest('persona.communication_style exists', !!agentData.agent?.persona?.communication_style);
  logTest('persona.principles exists', Array.isArray(agentData.agent?.persona?.principles));
  logTest('menu exists and has items', Array.isArray(agentData.agent?.menu) && agentData.agent.menu.length > 0);
} catch (error) {
  logTest('Agent structure check', false, error.message);
}
console.log();

// Test 3: Workflow Files
log('3. Workflow Files Existence', 'blue');
try {
  const fileContent = fs.readFileSync(agentPath, 'utf8');
  const agentData = yaml.load(fileContent);
  const workflowsDir = path.join(agentDir, 'workflows');

  const workflowItems = agentData.agent.menu.filter((item) => item.workflow);

  for (const item of workflowItems) {
    const workflowPath = item.workflow.replace('{agent-folder}', agentDir).replace(agentDir + '/', '');
    const fullPath = path.join(agentDir, workflowPath);
    const exists = fs.existsSync(fullPath);
    logTest(`Workflow: ${item.trigger}`, exists, exists ? '' : `Missing: ${workflowPath}`);
  }
} catch (error) {
  logTest('Workflow files check', false, error.message);
}
console.log();

// Test 4: Sidecar Files
log('4. Sidecar Resource Files', 'blue');
try {
  const sidecarFiles = [
    'ai-image-generator-sidecar/instructions.md',
    'ai-image-generator-sidecar/MCP_CAPABILITIES.md',
    'ai-image-generator-sidecar/best-practices-framework.md',
    'ai-image-generator-sidecar/config.yaml',
    'ai-image-generator-sidecar/platform-specs.yaml',
  ];

  for (const file of sidecarFiles) {
    const fullPath = path.join(agentDir, file);
    const exists = fs.existsSync(fullPath);
    logTest(path.basename(file), exists, exists ? '' : `Missing: ${file}`);
  }

  // Check outputs directory
  const outputsDir = path.join(agentDir, 'ai-image-generator-sidecar/outputs');
  const outputsExists = fs.existsSync(outputsDir) && fs.statSync(outputsDir).isDirectory();
  logTest('outputs directory', outputsExists);
} catch (error) {
  logTest('Sidecar files check', false, error.message);
}
console.log();

// Test 5: Menu Structure
log('5. Menu Structure & Triggers', 'blue');
try {
  const fileContent = fs.readFileSync(agentPath, 'utf8');
  const agentData = yaml.load(fileContent);

  const triggers = agentData.agent.menu.map((item) => item.trigger);
  const uniqueTriggers = new Set(triggers);
  logTest('No duplicate triggers', triggers.length === uniqueTriggers.size);

  const allKebabCase = triggers.every((t) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t));
  logTest('All triggers are kebab-case', allKebabCase);

  const allHaveTargets = agentData.agent.menu.every((item) => item.workflow || item.action || item.exec || item.tmpl || item.data);
  logTest('All menu items have command targets', allHaveTargets);

  const allHaveDescriptions = agentData.agent.menu.every((item) => item.description && item.description.trim().length > 0);
  logTest('All menu items have descriptions', allHaveDescriptions);

  log(`  → Total menu items: ${agentData.agent.menu.length}`, 'cyan');
} catch (error) {
  logTest('Menu structure check', false, error.message);
}
console.log();

// Test 6: Critical Actions
log('6. Critical Actions Validation', 'blue');
try {
  const fileContent = fs.readFileSync(agentPath, 'utf8');
  const agentData = yaml.load(fileContent);

  if (agentData.agent.critical_actions) {
    logTest('critical_actions defined', true);
    logTest('critical_actions is array', Array.isArray(agentData.agent.critical_actions));
    logTest('Has at least one action', agentData.agent.critical_actions.length > 0);

    const allNonEmpty = agentData.agent.critical_actions.every((action) => typeof action === 'string' && action.trim().length > 0);
    logTest('All actions are non-empty strings', allNonEmpty);

    log(`  → Total critical actions: ${agentData.agent.critical_actions.length}`, 'cyan');
  } else {
    logTest('critical_actions defined', false, 'Optional but recommended');
  }
} catch (error) {
  logTest('Critical actions check', false, error.message);
}
console.log();

// Test 7: Persona Quality
log('7. Persona Quality Checks', 'blue');
try {
  const fileContent = fs.readFileSync(agentPath, 'utf8');
  const agentData = yaml.load(fileContent);

  const { persona } = agentData.agent;

  logTest('Role is descriptive (>50 chars)', persona.role.length > 50);
  logTest('Identity is comprehensive (>100 chars)', persona.identity.length > 100);
  logTest('Communication style defined (>20 chars)', persona.communication_style.length > 20);
  logTest('Has multiple principles (≥3)', persona.principles.length >= 3);

  log(`  → Principles count: ${persona.principles.length}`, 'cyan');
} catch (error) {
  logTest('Persona quality check', false, error.message);
}
console.log();

// Summary
log('═══════════════════════════════════════════════════════════', 'cyan');
log('Test Results:', 'cyan');
log(`  Total:  ${testsPassed + testsFailed}`, 'cyan');
log(`  Passed: ${testsPassed}`, testsPassed === testsPassed + testsFailed ? 'green' : 'yellow');
log(`  Failed: ${testsFailed}`, testsFailed === 0 ? 'green' : 'red');
log('═══════════════════════════════════════════════════════════', 'cyan');
console.log();

if (testsFailed === 0) {
  log('✨ All tests passed! Agent is production-ready.', 'green');
  console.log();
  process.exit(0);
} else {
  log('❌ Some tests failed. Please review the issues above.', 'red');
  console.log();
  process.exit(1);
}

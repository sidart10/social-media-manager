/**
 * Powered by BMAD™ Core
 * Production Readiness Test Suite
 * Validates system integrity before deployment
 */

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

// Color output
const colors = {
  green: '\u001B[32m',
  red: '\u001B[31m',
  yellow: '\u001B[33m',
  blue: '\u001B[36m',
  reset: '\u001B[0m',
};

function pass(msg) {
  console.log(`${colors.green}✅ PASS${colors.reset} ${msg}`);
}

function fail(msg) {
  console.log(`${colors.red}❌ FAIL${colors.reset} ${msg}`);
  process.exitCode = 1;
}

function warn(msg) {
  console.log(`${colors.yellow}⚠️  WARN${colors.reset} ${msg}`);
}

function section(msg) {
  console.log(`\n${colors.blue}=== ${msg} ===${colors.reset}`);
}

// TEST 1: Agent Files Complete
section('TEST 1: Agent Files Complete');

const agentFiles = ['bmad/agents/content-intelligence/jarvis.md', 'bmad/agents/zoe/zoe.md', 'bmad/agents/zoro/zoro.md'];

for (const file of agentFiles) {
  if (fs.existsSync(file)) {
    pass(`Agent file exists: ${path.basename(file)}`);
  } else {
    fail(`Agent file missing: ${file}`);
  }
}

// TEST 2: Registry Accuracy
section('TEST 2: Registry Accuracy');

// Check agent manifest
const agentManifest = fs.readFileSync('bmad/_cfg/agent-manifest.csv', 'utf8');
const agentLines = agentManifest.split('\n').filter((l) => l.trim() && !l.startsWith('name,'));

// Check for duplicates
const agentNames = agentLines
  .map((l) => {
    const match = l.match(/^"([^"]+)"/);
    return match ? match[1] : null;
  })
  .filter(Boolean);

const duplicates = agentNames.filter((name, i) => agentNames.indexOf(name) !== i);

if (duplicates.length === 0) {
  pass('No duplicate agents in manifest');
} else {
  fail(`Duplicate agents found: ${duplicates.join(', ')}`);
}

// Verify agent count
if (agentNames.length === 5) {
  pass(`Agent count correct: ${agentNames.length}`);
} else {
  warn(`Agent count: ${agentNames.length} (expected: 5)`);
}

// TEST 3: Workflow Files Exist
section('TEST 3: Workflow Files Exist');

const workflowManifest = fs.readFileSync('bmad/_cfg/workflow-manifest.csv', 'utf8');
const workflowLines = workflowManifest.split('\n').filter((l) => l.trim() && !l.startsWith('name,'));

let workflowsChecked = 0;
for (const line of workflowLines) {
  const match = line.match(/"([^"]+)","[^"]*","[^"]+","([^"]+)"/);
  if (match) {
    const name = match[1];
    const workflowPath = match[2];

    if (fs.existsSync(workflowPath)) {
      workflowsChecked++;
    } else {
      fail(`Workflow missing: ${name} → ${workflowPath}`);
    }
  }
}

if (workflowsChecked >= 16) {
  pass(`Workflows validated: ${workflowsChecked}/30`);
} else {
  fail(`Only ${workflowsChecked} workflows found (expected: 16+)`);
}

// TEST 4: Skills Complete
section('TEST 4: Skills Complete');

const skillDirs = ['.claude/skills/jarvis', '.claude/skills/zoe'];

let totalSkills = 0;
for (const dir of skillDirs) {
  if (!fs.existsSync(dir)) {
    fail(`Skill directory missing: ${dir}`);
    continue;
  }

  const skills = fs.readdirSync(dir).filter((f) => {
    const stat = fs.statSync(path.join(dir, f));
    return stat.isDirectory();
  });

  for (const skill of skills) {
    const skillFile = path.join(dir, skill, 'SKILL.md');
    if (fs.existsSync(skillFile)) {
      totalSkills++;
    } else {
      fail(`Skill missing SKILL.md: ${dir}/${skill}`);
    }
  }
}

if (totalSkills >= 20) {
  pass(`Skills complete: ${totalSkills}`);
} else {
  warn(`Skills found: ${totalSkills} (expected: 20+)`);
}

// TEST 5: Code Quality
section('TEST 5: Code Quality');

try {
  execSync('npm run lint', { stdio: 'pipe' });
  pass('ESLint passed (0 warnings)');
} catch {
  fail('ESLint failed - run npm run lint:fix');
}

try {
  execSync('npm run format:check', { stdio: 'pipe' });
  pass('Prettier check passed');
} catch {
  fail('Format check failed - run npm run format:fix');
}

// TEST 6: Documentation Files
section('TEST 6: Documentation Files');

const docsRequired = ['docs/mcp-tool-naming-standards.md', 'docs/mcp-server-setup.md', '.env.template'];

for (const doc of docsRequired) {
  if (fs.existsSync(doc)) {
    pass(`Documentation exists: ${path.basename(doc)}`);
  } else {
    fail(`Documentation missing: ${doc}`);
  }
}

// TEST 7: Output Structure
section('TEST 7: Output Structure');

const outputStructure = ['outputs/templates/project-structure', 'outputs/projects', 'outputs/README.md'];

for (const item of outputStructure) {
  if (fs.existsSync(item)) {
    pass(`Output structure exists: ${path.basename(item)}`);
  } else {
    warn(`Output structure missing: ${item}`);
  }
}

// TEST 8: Validation Scripts
section('TEST 8: Validation Scripts');

const validationScripts = ['test/validate-file-structure.sh', 'test/validate-registries.sh'];

for (const script of validationScripts) {
  if (fs.existsSync(script)) {
    // Check if executable
    try {
      fs.accessSync(script, fs.constants.X_OK);
      pass(`Validation script ready: ${path.basename(script)}`);
    } catch {
      warn(`Script not executable: ${script} (run chmod +x)`);
    }
  } else {
    fail(`Validation script missing: ${script}`);
  }
}

// SUMMARY
section('PRODUCTION READINESS SUMMARY');

if (process.exitCode === 1) {
  console.log(`\n${colors.red}❌ NOT READY${colors.reset} - Fix failed tests above`);
  console.log(`Run: npm run lint:fix && npm run format:fix\n`);
} else {
  console.log(`\n${colors.green}✅ SYSTEM PRODUCTION READY${colors.reset}`);
  console.log(`\nAll critical tests passed. System ready for Epic 7 testing.\n`);
}

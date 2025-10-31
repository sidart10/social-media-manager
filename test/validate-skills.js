#!/usr/bin/env node
/**
 * Comprehensive Skill Validation Test Suite
 * Validates all skills in .claude/skills/ follow Anthropic best practices
 *
 * Usage:
 *   node test/validate-skills.js                    # Test all skills
 *   node test/validate-skills.js --skill post-writer # Test specific skill
 *   node test/validate-skills.js --strict            # Fail on warnings
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

class SkillValidator {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.errors = [];
    this.warnings = [];
    this.info = [];
  }

  /**
   * Validate a single skill directory
   */
  validateSkill(skillPath, skillName) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`${colors.cyan}Validating: ${skillName}${colors.reset}`);
    console.log(`${'='.repeat(70)}`);

    this.errors = [];
    this.warnings = [];
    this.info = [];

    const skillMdPath = path.join(skillPath, 'SKILL.md');

    // Check SKILL.md exists
    if (!fs.existsSync(skillMdPath)) {
      this.errors.push(`SKILL.md not found`);
      return this.getResults();
    }

    const content = fs.readFileSync(skillMdPath, 'utf-8');

    // Validate structure
    this.validateYAMLFrontmatter(content);
    this.validateContent(content, skillPath);
    this.validateFileReferences(content, skillPath);
    this.validateScripts(skillPath);

    return this.getResults();
  }

  /**
   * Validate YAML frontmatter
   */
  validateYAMLFrontmatter(content) {
    // Check opening ---
    if (!content.startsWith('---\n')) {
      this.errors.push("Missing opening '---' on line 1");
      return;
    }

    // Split by ---
    const parts = content.split('---\n');
    if (parts.length < 3) {
      this.errors.push("Missing closing '---'");
      return;
    }

    // Parse YAML
    let metadata;
    try {
      metadata = yaml.load(parts[1]);
    } catch (e) {
      this.errors.push(`Invalid YAML syntax: ${e.message}`);
      return;
    }

    // Validate name field
    if (!metadata.name) {
      this.errors.push("Missing required field: 'name'");
    } else {
      this.validateName(metadata.name);
    }

    // Validate description field
    if (!metadata.description) {
      this.errors.push("Missing required field: 'description'");
    } else {
      this.validateDescription(metadata.description);
    }

    // Check allowed-tools (optional)
    if (metadata['allowed-tools']) {
      this.info.push(`Tool restrictions: ${metadata['allowed-tools']}`);
    }

    this.info.push(`✓ YAML frontmatter valid`);
  }

  /**
   * Validate name field
   */
  validateName(name) {
    // Lowercase letters, numbers, hyphens only
    if (!/^[a-z0-9-]+$/.test(name)) {
      this.errors.push(`Name '${name}' must contain only lowercase letters, numbers, and hyphens`);
    }

    // Max 64 characters
    if (name.length > 64) {
      this.errors.push(`Name too long: ${name.length}/64 characters`);
    }

    // Check for common mistakes
    if (name.includes('_')) {
      this.errors.push(`Name contains underscore - use hyphens`);
    }

    if (name.includes(' ')) {
      this.errors.push(`Name contains spaces - use hyphens`);
    }

    if (/[A-Z]/.test(name)) {
      this.errors.push(`Name contains uppercase - must be all lowercase`);
    }

    // Gerund form recommendation
    const gerundWords = ['analyzing', 'creating', 'generating', 'formatting',
                         'extracting', 'optimizing', 'validating', 'processing',
                         'building', 'designing', 'writing', 'managing'];

    const hasGerund = gerundWords.some(word => name.includes(word));

    if (!hasGerund && !name.includes('mastery') && !name.includes('guide')) {
      this.warnings.push(`Consider gerund form (verb+ing) for action skills: ${gerundWords.join(', ')}`);
    }

    this.info.push(`✓ Name: ${name} (${name.length}/64 chars)`);
  }

  /**
   * Validate description field
   */
  validateDescription(description) {
    // Max 1024 characters
    if (description.length > 1024) {
      this.errors.push(`Description too long: ${description.length}/1024 characters`);
    }

    // Minimum length recommendation
    if (description.length < 50) {
      this.warnings.push(`Description short (${description.length} chars) - add more trigger keywords`);
    }

    // Should include "when" guidance
    const hasWhen = /use when|when to use|when working|when you/i.test(description);
    if (!hasWhen) {
      this.warnings.push(`Description should include WHEN to use skill for better discovery`);
    }

    // Check for vague starters
    if (/^(for |helps with |about )/i.test(description)) {
      this.warnings.push(`Description starts vaguely - be more specific`);
    }

    // Template placeholder check
    if (description.includes('Brief description of what this')) {
      this.errors.push(`Description is template placeholder - must be customized`);
    }

    // Word count
    const wordCount = description.split(/\s+/).length;
    this.info.push(`✓ Description: ${description.length}/1024 chars, ~${wordCount} words`);

    // Trigger keyword density
    if (wordCount < 15) {
      this.warnings.push(`Description has few words (${wordCount}) - add more triggers`);
    }
  }

  /**
   * Validate content sections
   */
  validateContent(content, skillPath) {
    const body = content.split('---\n').slice(2).join('---\n');

    // Recommended sections
    const sections = {
      'When to Use': /## When to Use/i,
      'Instructions': /## Instructions/i,
      'Examples': /## Example/i,
    };

    for (const [name, regex] of Object.entries(sections)) {
      if (!regex.test(body)) {
        if (name === 'Examples') {
          this.warnings.push(`Missing recommended section: '## ${name}'`);
        } else {
          this.warnings.push(`Missing section: '## ${name}'`);
        }
      } else {
        this.info.push(`✓ Has '## ${name}' section`);
      }
    }

    // Check for placeholder content
    if (body.includes('*Quick reference patterns will be added as you use')) {
      this.warnings.push(`Contains auto-generated placeholder text - should be customized`);
    }
  }

  /**
   * Validate file references
   */
  validateFileReferences(content, skillPath) {
    // Find markdown links
    const linkRegex = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
    const matches = [...content.matchAll(linkRegex)];

    const missingFiles = [];
    const validFiles = [];

    for (const match of matches) {
      const linkText = match[1];
      const linkPath = match[2];

      // Resolve path (relative to skill directory)
      const fullPath = path.join(skillPath, linkPath);

      if (fs.existsSync(fullPath)) {
        validFiles.push(linkPath);
      } else {
        missingFiles.push(linkPath);
      }
    }

    if (missingFiles.length > 0) {
      this.warnings.push(`Referenced files missing: ${missingFiles.join(', ')}`);
    }

    if (validFiles.length > 0) {
      this.info.push(`✓ File references: ${validFiles.length} files exist`);
    }
  }

  /**
   * Validate scripts directory
   */
  validateScripts(skillPath) {
    const scriptsDir = path.join(skillPath, 'scripts');

    if (!fs.existsSync(scriptsDir)) {
      return; // Scripts optional
    }

    const scriptFiles = fs.readdirSync(scriptsDir)
      .filter(f => f.endsWith('.py') || f.endsWith('.js') || f.endsWith('.sh'));

    if (scriptFiles.length === 0) {
      return;
    }

    this.info.push(`✓ Scripts: ${scriptFiles.length} file(s)`);

    // Check execute permissions (Unix only)
    if (process.platform !== 'win32') {
      for (const script of scriptFiles) {
        const scriptPath = path.join(scriptsDir, script);
        const stats = fs.statSync(scriptPath);

        // Check if executable bit set
        if (!(stats.mode & 0o111)) {
          this.warnings.push(`Script not executable: ${script} - run 'chmod +x scripts/${script}'`);
        }
      }
    }
  }

  /**
   * Get validation results
   */
  getResults() {
    return {
      errors: this.errors,
      warnings: this.warnings,
      info: this.info,
      passed: this.errors.length === 0,
      quality: this.getQualityScore(),
    };
  }

  /**
   * Calculate quality score
   */
  getQualityScore() {
    if (this.errors.length > 0) return 0;
    if (this.warnings.length > 3) return 50;
    if (this.warnings.length > 0) return 75;
    return 100;
  }

  /**
   * Print results
   */
  printResults(results, skillName) {
    // Errors
    if (results.errors.length > 0) {
      console.log(`\n${colors.red}❌ ERRORS (must fix):${colors.reset}`);
      console.log('-'.repeat(70));
      results.errors.forEach(e => {
        console.log(`  ${colors.red}✗${colors.reset} ${e}`);
      });
    }

    // Warnings
    if (results.warnings.length > 0) {
      console.log(`\n${colors.yellow}⚠️  WARNINGS (should fix):${colors.reset}`);
      console.log('-'.repeat(70));
      results.warnings.forEach(w => {
        console.log(`  ${colors.yellow}⚡${colors.reset} ${w}`);
      });
    }

    // Info
    if (results.info.length > 0) {
      console.log(`\n${colors.green}✅ VALIDATED:${colors.reset}`);
      console.log('-'.repeat(70));
      results.info.forEach(i => {
        console.log(`  ${i}`);
      });
    }

    // Summary
    console.log(`\n${'='.repeat(70)}`);
    if (results.passed && results.warnings.length === 0) {
      console.log(`${colors.green}✅ ${skillName}: PERFECT - Quality score: ${results.quality}/100${colors.reset}`);
    } else if (results.passed) {
      console.log(`${colors.yellow}⚠️  ${skillName}: PASSED WITH ${results.warnings.length} WARNINGS - Score: ${results.quality}/100${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ ${skillName}: FAILED - ${results.errors.length} error(s)${colors.reset}`);
    }
    console.log(`${'='.repeat(70)}`);
  }
}

/**
 * Find all skills in directory
 */
function findSkills(baseDir) {
  const skills = [];

  function scanDir(dir, category = null) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      if (!item.isDirectory()) continue;

      const itemPath = path.join(dir, item.name);
      const skillMd = path.join(itemPath, 'SKILL.md');

      // If has SKILL.md, it's a skill
      if (fs.existsSync(skillMd)) {
        skills.push({
          name: item.name,
          path: itemPath,
          category: category || 'root',
        });
      } else {
        // Could be a category directory, scan deeper
        scanDir(itemPath, item.name);
      }
    }
  }

  scanDir(baseDir);
  return skills;
}

/**
 * Main test execution
 */
async function main() {
  const args = process.argv.slice(2);
  const specificSkill = args.find(a => a.startsWith('--skill='))?.split('=')[1];
  const strict = args.includes('--strict');

  console.log(`${colors.cyan}${'='.repeat(70)}${colors.reset}`);
  console.log(`${colors.cyan}CLAUDE CODE SKILLS - VALIDATION TEST SUITE${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(70)}${colors.reset}`);

  const projectSkillsDir = path.join(process.cwd(), '.claude', 'skills');
  const personalSkillsDir = path.join(process.env.HOME, '.claude', 'skills');

  let allSkills = [];

  // Find project skills
  if (fs.existsSync(projectSkillsDir)) {
    const projectSkills = findSkills(projectSkillsDir);
    projectSkills.forEach(s => s.location = 'project');
    allSkills.push(...projectSkills);
  }

  // Find personal skills
  if (fs.existsSync(personalSkillsDir)) {
    const personalSkills = findSkills(personalSkillsDir);
    personalSkills.forEach(s => s.location = 'personal');
    allSkills.push(...personalSkills);
  }

  // Filter for specific skill if requested
  if (specificSkill) {
    allSkills = allSkills.filter(s => s.name === specificSkill);
    if (allSkills.length === 0) {
      console.log(`${colors.red}❌ Skill not found: ${specificSkill}${colors.reset}`);
      process.exit(1);
    }
  }

  console.log(`\n${colors.blue}Found ${allSkills.length} skill(s)${colors.reset}`);
  console.log(`Project skills: ${allSkills.filter(s => s.location === 'project').length}`);
  console.log(`Personal skills: ${allSkills.filter(s => s.location === 'personal').length}`);

  // Validate each skill
  const validator = new SkillValidator({ strict });
  const results = [];

  for (const skill of allSkills) {
    const displayName = skill.category !== 'root'
      ? `${skill.category}/${skill.name}`
      : skill.name;

    const result = validator.validateSkill(skill.path, displayName);
    validator.printResults(result, displayName);

    results.push({
      name: displayName,
      location: skill.location,
      ...result,
    });
  }

  // Summary report
  console.log(`\n\n${colors.cyan}${'='.repeat(70)}${colors.reset}`);
  console.log(`${colors.cyan}SUMMARY REPORT${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(70)}${colors.reset}\n`);

  const perfect = results.filter(r => r.quality === 100);
  const good = results.filter(r => r.quality >= 75 && r.quality < 100);
  const needsWork = results.filter(r => r.quality >= 50 && r.quality < 75);
  const failed = results.filter(r => r.quality === 0);

  console.log(`${colors.green}✅ Perfect (100):${colors.reset} ${perfect.length}`);
  if (perfect.length > 0) {
    perfect.forEach(r => console.log(`   - ${r.name}`));
  }

  console.log(`\n${colors.green}✅ Good (75-99):${colors.reset} ${good.length}`);
  if (good.length > 0) {
    good.forEach(r => console.log(`   - ${r.name} (${r.warnings.length} warning(s))`));
  }

  console.log(`\n${colors.yellow}⚠️  Needs Work (50-74):${colors.reset} ${needsWork.length}`);
  if (needsWork.length > 0) {
    needsWork.forEach(r => console.log(`   - ${r.name} (${r.warnings.length} warnings)`));
  }

  console.log(`\n${colors.red}❌ Failed (0):${colors.reset} ${failed.length}`);
  if (failed.length > 0) {
    failed.forEach(r => console.log(`   - ${r.name} (${r.errors.length} error(s))`));
  }

  // Overall quality
  const avgQuality = results.reduce((sum, r) => sum + r.quality, 0) / results.length;

  console.log(`\n${'='.repeat(70)}`);
  console.log(`Average Quality Score: ${avgQuality.toFixed(1)}/100`);

  if (avgQuality === 100) {
    console.log(`${colors.green}✅ ALL SKILLS PERFECT!${colors.reset}`);
  } else if (avgQuality >= 75) {
    console.log(`${colors.green}✅ OVERALL: GOOD${colors.reset}`);
  } else if (avgQuality >= 50) {
    console.log(`${colors.yellow}⚠️  OVERALL: NEEDS IMPROVEMENT${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ OVERALL: CRITICAL ISSUES${colors.reset}`);
  }
  console.log(`${'='.repeat(70)}\n`);

  // Exit code
  const hasCriticalIssues = failed.length > 0;
  const hasWarnings = results.some(r => r.warnings.length > 0);

  if (hasCriticalIssues) {
    process.exit(1); // Fail on errors
  } else if (strict && hasWarnings) {
    process.exit(1); // Fail on warnings in strict mode
  } else {
    process.exit(0); // Success
  }
}

// Run
main().catch(err => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, err);
  process.exit(1);
});

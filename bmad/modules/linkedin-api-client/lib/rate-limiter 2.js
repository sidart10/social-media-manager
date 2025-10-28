import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RATE_FILE = join(__dirname, '../.rate-limit-state.json');

const LIMITS = {
  DAILY: 150,
  HOURLY_RECOMMENDED: 25,
};

export class RateLimiter {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    if (existsSync(RATE_FILE)) {
      try {
        return JSON.parse(readFileSync(RATE_FILE, 'utf8'));
      } catch {
        return this.createFreshState();
      }
    }
    return this.createFreshState();
  }

  createFreshState() {
    return {
      dailyCount: 0,
      hourlyCount: 0,
      lastReset: {
        daily: new Date().toISOString(),
        hourly: new Date().toISOString(),
      },
    };
  }

  saveState() {
    writeFileSync(RATE_FILE, JSON.stringify(this.state, null, 2));
  }

  checkAndReset() {
    const now = new Date();
    const lastReset = {
      daily: new Date(this.state.lastReset.daily),
      hourly: new Date(this.state.lastReset.hourly),
    };

    if (now.getDate() !== lastReset.daily.getDate()) {
      this.state.dailyCount = 0;
      this.state.lastReset.daily = now.toISOString();
    }

    if (now.getHours() !== lastReset.hourly.getHours()) {
      this.state.hourlyCount = 0;
      this.state.lastReset.hourly = now.toISOString();
    }

    this.saveState();
  }

  async checkLimit() {
    this.checkAndReset();

    const warnings = [];
    const errors = [];

    if (this.state.dailyCount >= LIMITS.DAILY) {
      errors.push(`Daily limit reached (${LIMITS.DAILY} posts/day)`);
    }

    if (this.state.hourlyCount >= LIMITS.HOURLY_RECOMMENDED) {
      warnings.push(`Hourly recommendation exceeded (${LIMITS.HOURLY_RECOMMENDED} posts/hour)`);
    }

    return {
      allowed: errors.length === 0,
      errors,
      warnings,
      remaining: {
        daily: LIMITS.DAILY - this.state.dailyCount,
        hourly: LIMITS.HOURLY_RECOMMENDED - this.state.hourlyCount,
      },
    };
  }

  incrementCount() {
    this.state.dailyCount++;
    this.state.hourlyCount++;
    this.saveState();
  }

  getStats() {
    this.checkAndReset();
    return {
      counts: {
        daily: this.state.dailyCount,
        hourly: this.state.hourlyCount,
      },
      limits: LIMITS,
      remaining: {
        daily: LIMITS.DAILY - this.state.dailyCount,
        hourly: LIMITS.HOURLY_RECOMMENDED - this.state.hourlyCount,
      },
    };
  }
}

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RATE_FILE = join(__dirname, '../.rate-limit-state.json');

const LIMITS = {
  MONTHLY: 1500,
  DAILY_RECOMMENDED: 50,
  HOURLY_RECOMMENDED: 10,
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
      monthlyCount: 0,
      dailyCount: 0,
      hourlyCount: 0,
      lastReset: {
        monthly: new Date().toISOString(),
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
      monthly: new Date(this.state.lastReset.monthly),
      daily: new Date(this.state.lastReset.daily),
      hourly: new Date(this.state.lastReset.hourly),
    };

    if (now.getMonth() !== lastReset.monthly.getMonth()) {
      this.state.monthlyCount = 0;
      this.state.lastReset.monthly = now.toISOString();
    }

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

    if (this.state.monthlyCount >= LIMITS.MONTHLY) {
      errors.push(`Monthly limit reached (${LIMITS.MONTHLY} posts/month)`);
    }

    if (this.state.dailyCount >= LIMITS.DAILY_RECOMMENDED) {
      warnings.push(`Daily recommendation exceeded (${LIMITS.DAILY_RECOMMENDED} posts/day)`);
    }

    if (this.state.hourlyCount >= LIMITS.HOURLY_RECOMMENDED) {
      warnings.push(`Hourly recommendation exceeded (${LIMITS.HOURLY_RECOMMENDED} posts/hour)`);
    }

    return {
      allowed: errors.length === 0,
      errors,
      warnings,
      remaining: {
        monthly: LIMITS.MONTHLY - this.state.monthlyCount,
        daily: LIMITS.DAILY_RECOMMENDED - this.state.dailyCount,
        hourly: LIMITS.HOURLY_RECOMMENDED - this.state.hourlyCount,
      },
    };
  }

  incrementCount() {
    this.state.monthlyCount++;
    this.state.dailyCount++;
    this.state.hourlyCount++;
    this.saveState();
  }

  getStats() {
    this.checkAndReset();
    return {
      counts: {
        monthly: this.state.monthlyCount,
        daily: this.state.dailyCount,
        hourly: this.state.hourlyCount,
      },
      limits: LIMITS,
      remaining: {
        monthly: LIMITS.MONTHLY - this.state.monthlyCount,
        daily: LIMITS.DAILY_RECOMMENDED - this.state.dailyCount,
        hourly: LIMITS.HOURLY_RECOMMENDED - this.state.hourlyCount,
      },
    };
  }
}

#!/usr/bin/env node

// agent-governance-check
// Five governance questions for your AI agent system.
// https://evoked.dev

import { resolve } from 'node:path';
import { copyFile, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { scan } from '../src/scanner.js';
import { report, reportJson } from '../src/reporter.js';
import { questions } from '../src/questions.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, '..', 'templates');

const args = process.argv.slice(2);
const flags = new Set(args.filter(a => a.startsWith('--')));
const positional = args.filter(a => !a.startsWith('--'));

const targetDir = resolve(positional[0] || '.');
const jsonMode = flags.has('--json');
const initMode = flags.has('--init');
const verbose = flags.has('--verbose');
const help = flags.has('--help') || flags.has('-h');

if (help) {
  console.log(`
  ${bold('agent-governance-check')}
  Five governance questions for your AI agent system.

  ${dim('Usage:')}
    npx agent-governance-check              Scan current directory
    npx agent-governance-check ./project    Scan specific path
    npx agent-governance-check --init       Add starter templates to project
    npx agent-governance-check --json       Machine-readable output
    npx agent-governance-check --help       Show this help

  ${dim('What it checks:')}
    1. Decision memory      Can your agent explain its prior reasoning?
    2. Refusal capability    Can your agent say no?
    3. Persistent identity   Who is your agent between invocations?
    4. Disagreement protocol What happens when agents disagree?
    5. Drift detection       Would you know if your agent drifted?

  ${dim('No data leaves your machine. No signup. No tracking.')}
  ${dim('https://evoked.dev')}
`);
  process.exit(0);
}

// --init: copy starter templates into the project
if (initMode) {
  const destDir = join(targetDir, 'governance');

  try {
    await mkdir(destDir, { recursive: true });

    let copied = 0;
    for (const q of questions) {
      const src = join(TEMPLATES_DIR, q.template);
      const dest = join(destDir, q.template);

      // Don't overwrite existing files
      try {
        await access(dest);
        console.log(`  ${dim('exists')}  governance/${q.template}`);
      } catch {
        await copyFile(src, dest);
        console.log(`  ${green('added')}   governance/${q.template}`);
        copied++;
      }
    }

    console.log('');
    if (copied > 0) {
      console.log(`  ${copied} template${copied === 1 ? '' : 's'} added to ${bold('governance/')}`);
      console.log(`  ${dim('Fill them in. Make them yours.')}`);
    } else {
      console.log(`  ${dim('All templates already exist.')}`);
    }
    console.log('');
  } catch (err) {
    console.error(`  Error: ${err.message}`);
    process.exit(1);
  }

  process.exit(0);
}

// Main scan
console.log('');
console.log(`  ${dim('Scanning')} ${targetDir === resolve('.') ? '.' : targetDir} ${dim('...')}`);

const results = await scan(targetDir);

if (jsonMode) {
  console.log(reportJson(results));
} else {
  console.log(report(results, targetDir));
}

// ANSI helpers (duplicated here for the help text - keeps it dependency-free)
function bold(s) { return `\x1b[1m${s}\x1b[0m`; }
function dim(s) { return `\x1b[2m${s}\x1b[0m`; }
function green(s) { return `\x1b[32m${s}\x1b[0m`; }

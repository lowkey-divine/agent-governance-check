// Terminal output formatting for scan results.

import { questions } from './questions.js';

// ANSI codes - no dependencies needed
const bold = s => `\x1b[1m${s}\x1b[0m`;
const dim = s => `\x1b[2m${s}\x1b[0m`;
const red = s => `\x1b[31m${s}\x1b[0m`;
const green = s => `\x1b[32m${s}\x1b[0m`;
const yellow = s => `\x1b[33m${s}\x1b[0m`;
const cyan = s => `\x1b[36m${s}\x1b[0m`;

const STATUS_LABEL = {
  found: green('FOUND'),
  partial: yellow('PARTIAL'),
  missing: red('MISSING'),
};

function dots(label, width = 50) {
  const dotsNeeded = Math.max(2, width - label.length);
  return dim('.'.repeat(dotsNeeded));
}

export function report(scanResults, targetDir) {
  const { frameworks, results } = scanResults;
  const lines = [];

  lines.push('');

  // Framework detection
  if (frameworks.length > 0) {
    for (const fw of frameworks) {
      lines.push(`  ${dim('Agent framework detected:')} ${bold(fw.name)}`);
      for (const f of fw.files) {
        lines.push(`  ${dim('  ')}${cyan(f)}`);
      }
    }
    lines.push('');
  }

  // Header
  lines.push(`  ${bold('AGENT GOVERNANCE CHECK')}`);
  lines.push(`  ${dim('\u2500'.repeat(50))}`);
  lines.push('');

  let foundCount = 0;
  let partialCount = 0;

  for (const q of questions) {
    const result = results[q.id];
    const status = result.status;
    const statusLabel = STATUS_LABEL[status];

    if (status === 'found') foundCount++;
    if (status === 'partial') partialCount++;

    // Question line
    lines.push(`  ${bold(q.number + '.')} ${q.question}`);
    lines.push(`     ${q.short} ${dots(q.short)} ${statusLabel}`);

    // Evidence or gap description
    if (status === 'found') {
      const fileEvidence = result.evidence.filter(e => e.type === 'file').slice(0, 3);
      for (const e of fileEvidence) {
        lines.push(`     ${cyan(e.file)}`);
      }
      lines.push(`     ${dim(q.foundText)}`);
    } else if (status === 'partial') {
      const contentEvidence = result.evidence.slice(0, 2);
      for (const e of contentEvidence) {
        lines.push(`     ${cyan(e.file)} ${dim('\u2014 ' + e.signal)}`);
      }
      lines.push(`     ${dim(q.partialText)}`);
      lines.push(`     ${dim('\u2192 Template: ' + q.template)}`);
    } else {
      lines.push(`     ${dim(q.missingText)}`);
      lines.push(`     ${dim('\u2192 Template: ' + q.template)}`);
    }

    lines.push('');
  }

  // Score
  lines.push(`  ${dim('\u2500'.repeat(50))}`);

  const score = foundCount + partialCount;
  lines.push(`  ${bold('Score:')} ${score}/5 governance layers present`);

  if (partialCount > 0) {
    lines.push(`  ${dim(`(${foundCount} found, ${partialCount} partial)`)}`);
  }

  lines.push('');

  // Closing message - mirrors the diagnostic page
  if (foundCount === 5) {
    lines.push(`  ${dim("You're ahead of the field. The starter kit will sharpen what you've built.")}`);
  } else if (score >= 3) {
    lines.push(`  ${dim("You've started. The gaps have free templates waiting.")}`);
  } else {
    lines.push(`  ${dim('Your agents are functions. That is not an insult \u2014 functions are')}`);
    lines.push(`  ${dim('useful. But if you want agents, the templates are where to start.')}`);
  }

  lines.push('');

  const missingCount = 5 - foundCount - partialCount;
  if (missingCount > 0) {
    lines.push(`  Run ${bold('npx agent-governance-check --init')} to add starter templates.`);
  }
  lines.push(`  ${dim('Free starter kit: https://github.com/lowkey-divine/agent-governance-starter-kit')}`);
  lines.push(`  ${dim('Full framework:   https://evoked.dev/products/agent-governance-starter-kit')}`);
  lines.push('');

  return lines.join('\n');
}

export function reportJson(scanResults) {
  const output = {
    version: '0.1.0',
    frameworks: scanResults.frameworks,
    questions: questions.map(q => ({
      id: q.id,
      question: q.question,
      status: scanResults.results[q.id].status,
      evidence: scanResults.results[q.id].evidence,
      template: q.template,
      templateUrl: q.templateUrl,
    })),
    score: {
      found: 0,
      partial: 0,
      missing: 0,
      total: 5,
    },
  };

  for (const q of questions) {
    output.score[scanResults.results[q.id].status]++;
  }

  return JSON.stringify(output, null, 2);
}

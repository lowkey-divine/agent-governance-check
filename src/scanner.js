// Scans a directory for governance artifacts and agent framework configs.

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { governancePatterns, frameworkPatterns } from './patterns.js';

const IGNORE = new Set([
  'node_modules', '.git', '.next', 'dist', 'build', '.vercel',
  '.astro', '__pycache__', '.venv', 'venv', '.tox', 'vendor',
  'target', '.cargo', 'coverage', '.nyc_output',
]);

const MAX_FILE_SIZE = 256 * 1024; // 256KB - skip large files for content scan

function matchGlob(filePath, pattern) {
  // Simple glob matching: ** matches any path, * matches any segment
  const parts = pattern.split('/');
  const fileParts = filePath.split('/');

  let fi = 0;
  let pi = 0;

  while (pi < parts.length && fi < fileParts.length) {
    if (parts[pi] === '**') {
      if (pi === parts.length - 1) return true;
      pi++;
      // Try matching rest of pattern from each position
      while (fi < fileParts.length) {
        if (matchGlob(fileParts.slice(fi).join('/'), parts.slice(pi).join('/'))) return true;
        fi++;
      }
      return false;
    }

    if (parts[pi] === '*' || parts[pi] === fileParts[fi]) {
      pi++;
      fi++;
    } else if (parts[pi].includes('*')) {
      const regex = new RegExp('^' + parts[pi].replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
      if (regex.test(fileParts[fi])) {
        pi++;
        fi++;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return pi === parts.length && fi === fileParts.length;
}

async function walkDir(dir, baseDir) {
  const files = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }

  for (const entry of entries) {
    if (IGNORE.has(entry.name) || entry.name.startsWith('.') && entry.name !== '.mcp.json' && entry.name !== '.cursorrules' && entry.name !== '.cursor') {
      continue;
    }

    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await walkDir(fullPath, baseDir));
    } else if (entry.isFile()) {
      files.push(relative(baseDir, fullPath));
    }
  }

  return files;
}

async function readSmallFile(basePath, filePath) {
  const fullPath = join(basePath, filePath);
  try {
    const stats = await stat(fullPath);
    if (stats.size > MAX_FILE_SIZE) return null;
    return await readFile(fullPath, 'utf-8');
  } catch {
    return null;
  }
}

export async function scan(targetDir) {
  const allFiles = await walkDir(targetDir, targetDir);

  // Detect agent frameworks
  const detectedFrameworks = [];
  for (const fw of frameworkPatterns) {
    const matched = [];
    for (const pattern of fw.files) {
      for (const file of allFiles) {
        if (matchGlob(file, pattern)) {
          matched.push(file);
        }
      }
    }
    if (matched.length > 0) {
      detectedFrameworks.push({ name: fw.name, files: matched });
    }
  }

  // Check each governance question
  const results = {};

  for (const [questionId, patterns] of Object.entries(governancePatterns)) {
    const evidence = [];

    // Phase 1: File pattern matching
    const seenFiles = new Set();
    for (const pattern of patterns.files) {
      for (const file of allFiles) {
        if (matchGlob(file, pattern) && !seenFiles.has(file)) {
          seenFiles.add(file);
          evidence.push({ file, signal: 'file match', type: 'file' });
        }
      }
    }

    // Phase 2: Content signal scanning (only if no file matches yet)
    // Scan code files for governance-related content
    if (evidence.length === 0) {
      const codeFiles = allFiles.filter(f =>
        /\.(js|mjs|ts|py|yaml|yml|json)$/.test(f)
      );

      // Sample up to 50 files for content scanning
      const sample = codeFiles.slice(0, 50);

      for (const file of sample) {
        const content = await readSmallFile(targetDir, file);
        if (!content) continue;

        for (const signal of patterns.contentSignals) {
          if (signal.test(content)) {
            evidence.push({ file, signal: signal.source, type: 'content' });
            break; // One signal per file is enough
          }
        }
      }
    }

    // Determine status
    let status = 'missing';
    if (evidence.some(e => e.type === 'file')) {
      status = 'found';
    } else if (evidence.length > 0) {
      status = 'partial';
    }

    results[questionId] = { status, evidence };
  }

  return { frameworks: detectedFrameworks, results };
}

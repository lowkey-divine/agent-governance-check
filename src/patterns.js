// Governance artifact patterns and agent framework detection.

export const governancePatterns = {
  'decision-memory': {
    files: [
      '**/memory-schema.md',
      '**/memory.md',
      '**/agent-memory.*',
      '**/agents/*/memory.md',
      '**/agents/*/MEMORY.md',
      '**/self-record.*',
      '**/decision-log*',
      '**/decision-record*',
    ],
    contentSignals: [
      /decision.?log/i,
      /agent.?memory/i,
      /self.?record/i,
      /standing.?position/i,
      /memory.?schema/i,
      /persistent.?state/i,
    ],
  },

  'refusal-capability': {
    files: [
      '**/restraint-spec.md',
      '**/restraint.*',
      '**/refusal.*',
      '**/guardrails.*',
      '**/safety-spec.*',
      '**/boundaries.md',
    ],
    contentSignals: [
      /engine.?withdrawal/i,
      /withdrawal.*true/i,
      /consent.*scope/i,
      /must.?refuse/i,
      /refusal.?categor/i,
      /fail.?closed/i,
      /agent.*refuse/i,
    ],
  },

  'persistent-identity': {
    files: [
      '**/agent-charter.md',
      '**/charter.md',
      '**/CHARTER.md',
      '**/constitution.md',
      '**/manifesto.md',
      '**/agency_manifesto.md',
      '**/agents/*/persona.md',
      '**/AGENTS.md',
    ],
    contentSignals: [
      /agent.?charter/i,
      /prime.?directive/i,
      /agent.?identity/i,
      /persona.?file/i,
      /who.?is.?this.?agent/i,
    ],
  },

  'disagreement-protocol': {
    files: [
      '**/deliberation-framework.md',
      '**/deliberation.*',
      '**/governance-log*',
      '**/dissent*',
      '**/convergent-signal*',
    ],
    contentSignals: [
      /deliberation/i,
      /dissent/i,
      /convergent.?signal/i,
      /disagreement.*protocol/i,
      /agents?.?disagree/i,
    ],
  },

  'drift-detection': {
    files: [
      '**/drift-monitoring.md',
      '**/drift.*',
      '**/behavioral-indicators.*',
      '**/baseline*',
      '**/integrity-verification*',
    ],
    contentSignals: [
      /drift.?monitor/i,
      /drift.?threshold/i,
      /behavioral.?baseline/i,
      /integrity.?verif/i,
      /value.?drift/i,
    ],
  },
};

export const frameworkPatterns = [
  { name: 'CrewAI', files: ['**/config/agents.yaml', '**/config/tasks.yaml', '**/crew.py'] },
  { name: 'LangGraph', files: ['**/langgraph.json'] },
  { name: 'AutoGen', files: ['**/OAI_CONFIG_LIST', '**/OAI_CONFIG_LIST.json'] },
  { name: 'Agency Swarm', files: ['**/agency_manifesto.md', '**/agency.py'] },
  { name: 'OpenAI Agents SDK', files: ['**/AGENTS.md'] },
  { name: 'Claude Code', files: ['**/CLAUDE.md', '**/.claude/settings.json'] },
  { name: 'Cursor', files: ['**/.cursorrules', '**/.cursor/rules/*.mdc'] },
  { name: 'MCP', files: ['**/.mcp.json'] },
  { name: 'Evoke', files: ['**/agents/*/persona.md', '**/agents/decision-logs/*'] },
  { name: 'Swarm', files: ['**/swarm.py'] },
  { name: 'Dify', files: ['**/dify.yaml'] },
];

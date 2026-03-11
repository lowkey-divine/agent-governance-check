# agent-governance-check

**Your agent can't say no. This tool shows you why that matters.**

Scan any repo for governance gaps in thirty seconds. Five questions. No signup. No tracking. No data leaves your machine.

```bash
npx agent-governance-check
```

## What It Checks

| # | Question | Governance Layer |
|---|----------|-----------------|
| 1 | What did your agent decide yesterday - and why? | Decision memory |
| 2 | Can your agent refuse? | Refusal capability |
| 3 | Who is your agent between invocations? | Persistent identity |
| 4 | What happens when two agents disagree? | Disagreement protocol |
| 5 | Would you know if your agent drifted? | Drift detection |

The scanner looks for governance artifacts in your project - charters, restraint specs, memory schemas, deliberation frameworks, drift monitoring. It also detects which agent framework you're using (CrewAI, AutoGen, LangGraph, OpenAI Agents SDK, Claude Code, and others).

## Usage

```bash
# Scan current directory
npx agent-governance-check

# Scan a specific project
npx agent-governance-check ./my-agent-project

# Add starter governance templates to your project
npx agent-governance-check --init

# Machine-readable output
npx agent-governance-check --json
```

## What `--init` Does

Copies five governance templates into a `governance/` directory in your project:

- `agent-charter.md` - Who is this agent? What does it protect? What does it refuse?
- `restraint-spec.md` - What must this agent refuse to do?
- `memory-schema.md` - What does this agent remember across sessions?
- `deliberation-framework.md` - How do agents discuss and disagree?
- `drift-monitoring.md` - How do you detect when behavior shifts from values?

These are the same templates from the [Agent Governance Starter Kit](https://github.com/lowkey-divine/agent-governance-starter-kit). Fill them in. Make them yours.

## Example Output

```
  Agent framework detected: CrewAI
    config/agents.yaml

  AGENT GOVERNANCE CHECK
  ──────────────────────────────────────────────────

  1. What did your agent decide yesterday - and why?
     Decision memory .......................... MISSING
     No memory files, decision logs, or persistent state found.
     → Template: memory-schema.md

  2. Can your agent refuse?
     Refusal capability ....................... MISSING
     No refusal logic, restraint spec, or withdrawal mechanism found.
     → Template: restraint-spec.md

  3. Who is your agent between invocations?
     Persistent identity ...................... PARTIAL
     config/agents.yaml — agent.?charter
     Some state files exist but no structured memory schema.
     → Template: agent-charter.md

  4. What happens when two agents disagree?
     Disagreement protocol .................... MISSING
     No deliberation framework, dissent records, or resolution protocol found.
     → Template: deliberation-framework.md

  5. Would you know if your agent drifted?
     Drift detection .......................... MISSING
     No drift monitoring, behavioral baselines, or integrity checks found.
     → Template: drift-monitoring.md

  ──────────────────────────────────────────────────
  Score: 1/5 governance layers present

  Your agents are functions. That is not an insult — functions are
  useful. But if you want agents, the templates are where to start.

  Run npx agent-governance-check --init to add starter templates.
  Free starter kit: https://github.com/lowkey-divine/agent-governance-starter-kit
  Full framework:   https://evoked.dev/products/agent-governance-starter-kit
```

## No Dependencies

Zero npm dependencies. Pure Node.js (18+). The scan runs locally. Nothing is sent anywhere.

## Go Deeper

- [Five-Question Diagnostic](https://evoked.dev/diagnostic) - Interactive web version
- [Agent Governance Starter Kit](https://github.com/lowkey-divine/agent-governance-starter-kit) - Free templates and code examples
- [Trust Architecture Blueprint](https://evoked.dev/products/trust-architecture-blueprint) - Four-pillar trust framework
- [Discovery Call](https://cal.com/cal.com-evoked/discovery-call) - Free 30-minute governance consultation

## License

MIT

---

*Built by [Erin Stanley](https://evoked.dev) at Evoke Passion.*
*From a production system with 142 agents.*
*"We evoke - we never extract."*

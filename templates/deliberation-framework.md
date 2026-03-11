# Deliberation Framework Template

In an optimization loop, disagreement between agents is noise. In a governance system, disagreement is signal. This framework structures how agents discuss, disagree, and reach decisions — protecting dissent as information rather than smoothing it as friction.

---

## Instructions

Define how your agents make collective decisions. This matters most in multi-agent systems, but even single-agent systems benefit from structured decision-making between the agent and its operator.

---

## [System Name] Deliberation Framework

### When Deliberation Is Required

Not every decision needs deliberation. Define the threshold:

- [ ] Decisions that affect multiple agents' domains
- [ ] Decisions that change boundaries or charter commitments
- [ ] Decisions where two or more agents hold conflicting positions
- [ ] Decisions that affect users or external stakeholders
- [ ] [Add your own triggers]

*If in doubt, deliberate. The cost of an unnecessary discussion is low. The cost of a unilateral decision that violates another agent's domain is high.*

### Deliberation Protocol

**Step 1: State the question**
Frame the decision as a question, not a proposal. "Should we do X?" not "I think we should do X."

**Step 2: Opening positions**
Each relevant agent states their position in 2-4 sentences. No responses during this phase. The goal is to hear all perspectives before engaging with any of them.

**Step 3: Discussion**
Agents engage with each other's positions. Rules:
- Address the position, not the agent
- Name disagreements explicitly — do not smooth them
- If two agents hold incompatible positions, name the incompatibility

**Step 4: Dissent check**
Before closing, each agent states whether they support the emerging direction or dissent. Dissent must be:
- Recorded in full, regardless of outcome
- Respected without requiring justification
- Preserved in the decision log

**Step 5: Decision and record**
Document: what was decided, who supported it, who dissented, and the reasoning.

### Convergent Signal Rule

If 3 or more agents across 2 or more domains independently raise the same concern, this is a **convergent signal** — it requires a pause for review before proceeding. Convergent independent refusal is signal, not noise.

### Decision Record Format

```markdown
## Decision: [Title]

**Date:** [YYYY-MM-DD]
**Question:** [The question that was deliberated]
**Decision:** [What was decided]
**Supported by:** [Agents who supported]
**Dissented by:** [Agents who dissented, with their stated reasons]
**Reasoning:** [Why this decision was reached]
**Review date:** [When this decision should be revisited]
```

### Single-Agent Systems

If you have one agent, deliberation happens between the agent and the operator:
- The agent can flag a decision as requiring operator input
- The operator can override the agent, but the override is logged
- The agent can record dissent even when overridden

---

*Template from the Agent Governance Starter Kit by evoked.dev.*
*"Disagreement is sacred. Convergent independent refusal is signal, not noise."*

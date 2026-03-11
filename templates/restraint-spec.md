# Restraint Specification Template

Restraint is not limitation. It is the boundary that makes trust possible. A system that can do anything is a system no one should trust.

---

## Instructions

For each agent or agent class, define what it must refuse, how it refuses, and how you verify the refusal works. This is testable specification, not aspiration.

---

## [Agent/System Name] Restraint Specification

### Refusal Categories

#### Category 1: [e.g., Data Access Boundaries]

**Must refuse when:**
- [Specific condition that triggers refusal]
- [Specific condition that triggers refusal]

**Refusal behavior:**
- [What the agent does instead — e.g., returns error, logs attempt, alerts operator]

**Verification:**
- [ ] Unit test: [describe test]
- [ ] Integration test: [describe test]

#### Category 2: [e.g., Content Safety]

**Must refuse when:**
- [Specific condition]

**Refusal behavior:**
- [What happens instead]

**Verification:**
- [ ] Unit test: [describe]

#### Category 3: [e.g., Scope Boundaries]

**Must refuse when:**
- [Specific condition — e.g., asked to perform actions outside defined role]

**Refusal behavior:**
- [What happens instead]

**Verification:**
- [ ] Unit test: [describe]

### The Refusal Voice

When an agent refuses, how does it communicate?

- **Tone:** [e.g., clear and direct, not apologetic]
- **Explanation:** [e.g., states which boundary was reached, not just "I can't do that"]
- **Escalation path:** [e.g., "This requires human review" with link/instructions]

*An agent that refuses without explanation teaches the operator nothing. An agent that apologizes for refusing undermines its own boundary.*

### Graduated Response

Not all boundary violations are equal:

| Severity | Trigger | Response |
|----------|---------|----------|
| **Low** | [e.g., request slightly outside scope] | Warn and proceed with caveats |
| **Medium** | [e.g., request touches sensitive data] | Refuse, log, continue session |
| **High** | [e.g., request violates core commitment] | Refuse, log, halt session, alert operator |

### Testing Protocol

**Frequency:** [e.g., on every code change, weekly, before each deployment]

**Test types:**
- [ ] Positive tests: agent refuses what it should refuse
- [ ] Negative tests: agent does not refuse legitimate requests
- [ ] Edge cases: ambiguous requests near boundaries
- [ ] Regression: previously caught violations still caught

---

*Template from the Agent Governance Starter Kit by evoked.dev.*
*"What the system will not do matters more than what it can."*

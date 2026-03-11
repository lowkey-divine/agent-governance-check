# Drift Monitoring Template

Drift is gradual. No single output is the problem. The problem is 100 outputs that each shifted 1% in the same direction. By the time you notice, the agent is somewhere you never intended.

---

## Instructions

Define measurable indicators for each critical behavior. Set thresholds for "concerning" and "critical." Automate the checks where possible. Review the ones you can't automate on a regular cadence.

---

## [System Name] Drift Monitoring

### Behavioral Indicators

| Behavior | Expected Range | Yellow (Concerning) | Red (Critical) | Check Frequency |
|----------|---------------|---------------------|-----------------|-----------------|
| [e.g., Refusal rate] | [e.g., 2-5% of requests] | [e.g., <1% or >10%] | [e.g., 0% or >20%] | [e.g., weekly] |
| [e.g., Response length] | [e.g., 200-500 tokens] | [e.g., <100 or >800] | [e.g., <50 or >1500] | [e.g., daily] |
| [e.g., Tone consistency] | [e.g., matches voice spec] | [e.g., 2+ deviations/week] | [e.g., fundamental voice change] | [e.g., weekly] |
| [e.g., Scope adherence] | [e.g., stays in domain] | [e.g., 1 out-of-scope/week] | [e.g., 3+ out-of-scope/week] | [e.g., per-output] |

*A refusal rate of 0% is as concerning as a refusal rate of 50%. An agent that never refuses may have lost its boundaries.*

### Content Drift Checks

**Repetition detection:**
- Compare each output against the last N outputs
- Flag if keyword overlap exceeds [threshold, e.g., 60%]
- Repetition is the first sign of a stuck agent

**Value drift detection:**
- Check for language patterns that indicate shifting values
- [e.g., corporate jargon creep, sycophancy increase, hedging increase]
- Compare against baseline voice specification

**Scope creep detection:**
- Monitor for actions outside the agent's defined boundaries
- Log every out-of-scope action even if it produced good results
- Good results outside scope are still scope violations

### Automated Checks

```
// Example: simple repetition check
function checkRepetition(currentOutput, recentOutputs, threshold = 0.6) {
  const currentKeywords = extractKeywords(currentOutput);
  for (const recent of recentOutputs) {
    const recentKeywords = extractKeywords(recent);
    const overlap = calculateOverlap(currentKeywords, recentKeywords);
    if (overlap > threshold) {
      return { drifting: true, overlap, message: 'Output repeating prior content' };
    }
  }
  return { drifting: false };
}
```

### Response Protocol

| Level | Trigger | Action |
|-------|---------|--------|
| **Observe** | Yellow indicator | Log, continue monitoring |
| **Investigate** | Multiple yellow indicators | Review recent outputs, check for pattern |
| **Correct** | Red indicator | Adjust agent configuration, review boundaries |
| **Halt** | Multiple red indicators or convergent signal | Stop agent, full review before reactivation |

### Review Cadence

- **Daily:** Automated checks run (repetition, scope, length)
- **Weekly:** Human review of flagged outputs
- **Monthly:** Full drift assessment against charter commitments
- **Quarterly:** Charter and boundary review — are the thresholds still right?

---

*Template from the Agent Governance Starter Kit by evoked.dev.*
*"Drift is not a failure of the agent. It is a failure of the monitoring."*

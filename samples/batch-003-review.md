# SEC-701 Batch 003 Critical Review

## Batch summary

- Batch ID: `SEC701-BATCH-003`
- Questions: 24
- IDs: `SEC701-0000031` through `SEC701-0000054`
- Status: `approved`
- Reviewer: `initial-quality-review`
- Domain allocation: 3 / 5 / 4 / 7 / 5
- Difficulty distribution: easy = 6, medium = 12, hard = 6
- Stored correct-answer distribution: A = 6, B = 6, C = 6, D = 6
- Exact duplicate stems: none
- Duplicate concept keys: none
- Exact or reversed-clause duplicate answer choices: none
- High-similarity near-duplicate stems: none

The questions were automatically approved under the accelerated workflow authorized for growth from 30 to 150 questions. Automatic approval followed structural validation, source review, answer-choice checks, and comparison against the full existing bank.

## Cumulative domain coverage

| Domain | Before | Added | Total | Total share | Exam weight |
|---|---:|---:|---:|---:|---:|
| 1.0 General Security Concepts | 4 | 3 | 7 | 13.0% | 12% |
| 2.0 Threats, Vulnerabilities, and Mitigations | 6 | 5 | 11 | 20.4% | 22% |
| 3.0 Security Architecture | 5 | 4 | 9 | 16.7% | 18% |
| 4.0 Security Operations | 9 | 7 | 16 | 29.6% | 28% |
| 5.0 Security Program Management and Oversight | 6 | 5 | 11 | 20.4% | 20% |

## Question-by-question review

| ID | Objective | Topic | Quality finding |
|---|---|---|---|
| SEC701-0000031 | 1.2 | Authorization | The stem clearly separates identity verification from a later role-permission decision. |
| SEC701-0000032 | 1.3 | Configuration version control | The requirements for authorship, comparison, history, and restoration point specifically to version control. |
| SEC701-0000033 | 1.4 | Certificate revocation checking | The certificate remains within its dates, and the near-real-time single-certificate requirement distinguishes OCSP. |
| SEC701-0000034 | 2.1 | Threat actor capability and motivation | Limited resources, public tooling, defacement, and recognition provide both actor capability and motivation. |
| SEC701-0000035 | 2.2 | Removable-media social engineering | The enticing label and malicious USB jointly establish baiting through removable media. |
| SEC701-0000036 | 2.3 | SQL injection prevention | The unsafe string concatenation and SQL syntax make parameterized queries the direct code-level remediation. |
| SEC701-0000037 | 2.4 | DNS tunneling indicators | TXT traffic, long encoded labels, and abnormal volume distinguish DNS tunneling from a domain-generation pattern. |
| SEC701-0000038 | 2.5 | Service-account least privilege | The excessive domain privilege is directly corrected through a dedicated, noninteractive least-privilege account. |
| SEC701-0000039 | 3.1 | Serverless shared responsibility | The answer reflects the stable division between provider-managed platform infrastructure and customer-controlled application assets. |
| SEC701-0000040 | 3.2 | Out-of-band management | The requirement for an isolated path that survives production disruption uniquely identifies out-of-band management. |
| SEC701-0000041 | 3.3 | Data sovereignty | The wording asks about legal jurisdiction rather than only the contractual storage location, distinguishing sovereignty from residency. |
| SEC701-0000042 | 3.4 | Differential backups | The restoration set follows the defining behavior of differential backups without requiring an unnecessary chain. |
| SEC701-0000043 | 4.1 | Enterprise wireless authentication | Per-user directory authentication and individual revocation distinguish Enterprise mode from shared credentials. |
| SEC701-0000044 | 4.3 | Risk-based vulnerability prioritization | Active exploitation, public exposure, sensitive data, and business impact outweigh a higher base score on an isolated asset. |
| SEC701-0000045 | 4.4 | Log time synchronization | Clock drift and mixed time zones are directly addressed by synchronization and normalization rather than retention or integrity controls. |
| SEC701-0000046 | 4.5 | Outbound data loss prevention | The rule must inspect sensitive content and enforce an approved transfer channel, which is the purpose of DLP. |
| SEC701-0000047 | 4.6 | SAML federation | Signed XML assertions between an identity provider and service provider identify SAML without relying on answer position. |
| SEC701-0000048 | 4.8 | Chain of custody | The record described contains the defining elements of evidence chain of custody. |
| SEC701-0000049 | 4.9 | Network flow records | The requested historical connection metadata maps to flow records, and the stem explicitly states that payloads are unavailable. |
| SEC701-0000050 | 5.1 | RACI accountability | Final authority and sign-off identify the accountable RACI role, while the training manager remains responsible. |
| SEC701-0000051 | 5.2 | Annualized risk reduction | The calculation separates current ALE, residual ALE, and annual risk reduction; distractors correspond to common mistakes. |
| SEC701-0000052 | 5.3 | Right-to-audit clauses | The requested contractual ability to inspect controls and evidence is the right to audit rather than confidentiality or performance language. |
| SEC701-0000053 | 5.5 | Penetration-test scope control | The signed scope excludes the partner asset, making a pause and formal consultation the only authorized first action. |
| SEC701-0000054 | 5.6 | Physical security awareness | The response protects the physical boundary and uses an approved visitor process without encouraging confrontation. |

## Similarity review

- No stem pair reached the reporting threshold.

## Batch-level observations

- No question uses all-of-the-above, none-of-the-above, or linked answer labels.
- Scenario questions contain the material facts needed to support the intended decision.
- Explanations address every stored choice and identify when incorrect concepts would apply.
- The cumulative correct-answer distribution is balanced without changing technical answers to force a pattern.
- All 28 objectives remain represented after the merge.

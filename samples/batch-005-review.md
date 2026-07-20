# SEC-701 Batch 005 Critical Review

## Batch summary

- Batch ID: `SEC701-BATCH-005`
- Questions: 24
- IDs: `SEC701-0000079` through `SEC701-0000102`
- Status: `approved`
- Reviewer: `initial-quality-review`
- Approval date: `2026-07-20`
- Domain allocation: 3 / 5 / 4 / 7 / 5
- Difficulty distribution: easy = 6, medium = 12, hard = 6
- Stored correct-answer distribution: A = 6, B = 6, C = 6, D = 6
- Exact duplicate stems: none
- Duplicate concept keys: none
- Exact or reversed-clause duplicate answer choices: none
- High-similarity near-duplicate stems: none

The questions were automatically approved under the accelerated workflow authorized for growth from 30 to 150 questions. Each question was compared against the complete 78-question starting bank before merging.

## Cumulative domain coverage

| Domain | Before | Added | Total | Total share | Exam weight |
|---|---:|---:|---:|---:|---:|
| 1.0 General Security Concepts | 10 | 3 | 13 | 12.7% | 12% |
| 2.0 Threats, Vulnerabilities, and Mitigations | 16 | 5 | 21 | 20.6% | 22% |
| 3.0 Security Architecture | 13 | 4 | 17 | 16.7% | 18% |
| 4.0 Security Operations | 23 | 7 | 30 | 29.4% | 28% |
| 5.0 Security Program Management and Oversight | 16 | 5 | 21 | 20.6% | 20% |

## Question-by-question review

| ID | Objective | Topic | Quality finding |
|---|---|---|---|
| SEC701-0000079 | 1.1 | Detective physical controls | The recording purpose makes the control detective, while the physical camera implementation establishes its category. |
| SEC701-0000080 | 1.3 | Emergency change management | The question preserves emergency speed while requiring prompt documentation, review, validation, and baseline reconciliation. |
| SEC701-0000081 | 1.4 | Hybrid encryption | The selected hybrid design separates efficient bulk encryption from recipient key protection and avoids sending secret material with the archive. |
| SEC701-0000082 | 2.1 | Nation-state espionage | Strategic intelligence collection, custom tooling, unknown exploits, and long dwell time jointly support nation-state attribution at the exam-concept level. |
| SEC701-0000083 | 2.2 | Watering-hole attacks | The attackers compromise a site frequented by the target population, which is the defining watering-hole delivery model. |
| SEC701-0000084 | 2.3 | Server-side request forgery | The vulnerable server is induced to contact a cloud metadata endpoint, clearly distinguishing SSRF from browser- and file-path vulnerabilities. |
| SEC701-0000085 | 2.4 | Domain generation algorithms | Large numbers of algorithmic domains, NXDOMAIN responses, and intermittent successful command channels form a coherent DGA indicator set. |
| SEC701-0000086 | 2.5 | Host-based segmentation | The centrally managed endpoint policy permits required server flows while directly blocking peer protocols useful for lateral movement. |
| SEC701-0000087 | 3.1 | Microservices security | The answer identifies the expanded service identities, east-west trust paths, and distributed observability burden without claiming that microservices remove controls. |
| SEC701-0000088 | 3.2 | Bastion hosts | The requirement for one hardened administrative entry point identifies a bastion host rather than a public-traffic or name-resolution component. |
| SEC701-0000089 | 3.3 | Data masking | The need for realistic structure without real sensitive values maps directly to data masking. |
| SEC701-0000090 | 3.4 | Incremental backups | The restore logic correctly requires the complete incremental chain after the last full backup and contrasts with the earlier differential-backup question. |
| SEC701-0000091 | 4.1 | Secure boot | Signature verification before startup execution identifies Secure Boot and does not overlap with runtime sandboxing. |
| SEC701-0000092 | 4.2 | End-of-life assets | Replacement is presented as the long-term asset-lifecycle action, with isolation and compensating controls clearly limited to the transition. |
| SEC701-0000093 | 4.3 | Credentialed vulnerability scanning | Authorized local access provides the requested patch, software, and configuration visibility, distinguishing credentialed scanning from external inference. |
| SEC701-0000094 | 4.5 | Web application firewalls | The control must inspect HTTPS application requests for attack patterns, which is the WAF use case. |
| SEC701-0000095 | 4.7 | Idempotent automation | State checks and stable identifiers make retries safe, testing an important automation reliability concept rather than general response speed. |
| SEC701-0000096 | 4.8 | Incident eradication | Containment has already occurred, and the selected action removes threat artifacts, persistence, and the exploited weakness. |
| SEC701-0000097 | 4.9 | Endpoint process trees | The evidence requirement is a parent-child execution chain, making an EDR process tree the most direct data source. |
| SEC701-0000098 | 5.1 | Due diligence | The stem distinguishes the initial selection of controls from ongoing review and maintenance, supporting due diligence. |
| SEC701-0000099 | 5.2 | Residual risk | The wording explicitly asks for risk remaining after treatment, which is the definition of residual risk. |
| SEC701-0000100 | 5.3 | Vendor offboarding | The offboarding answer covers access revocation, data portability, retention or destruction, and evidence rather than a narrow administrative step. |
| SEC701-0000101 | 5.4 | Data controller and processor roles | The retailer determines purpose and means while the provider follows instructions, making the controller and processor roles clear. |
| SEC701-0000102 | 5.5 | Internal audits | The answer accurately describes objective internal control evaluation without promising regulatory outcomes or replacing management responsibility. |

## Similarity review

- No stem pair reached the reporting threshold.

## Batch-level observations

- No question depends on stored or displayed answer position.
- No question uses all-of-the-above, none-of-the-above, or linked answer labels.
- Scenario questions contain the facts needed to support the intended answer.
- Incorrect-answer explanations distinguish adjacent concepts rather than merely restating that a choice is wrong.
- All 28 published objectives remain represented in the approved bank.

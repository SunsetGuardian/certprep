# SEC-701 Batch 007 Critical Review

## Batch summary

- Batch ID: `SEC701-BATCH-007`
- Questions: 24
- IDs: `SEC701-0000127` through `SEC701-0000150`
- Status: `approved`
- Reviewer: `initial-quality-review`
- Approval date: `2026-07-20`
- Domain allocation: 2 / 7 / 6 / 5 / 4
- Difficulty distribution: easy = 6, medium = 12, hard = 6
- Stored correct-answer distribution: A = 6, B = 6, C = 6, D = 6
- Exact duplicate stems: none
- Duplicate concept keys: none
- Exact or reversed-clause duplicate answer choices: none
- High-similarity near-duplicate stems: none

This is the final automatically approved batch in the accelerated build phase. Its domain allocation was intentionally adjusted so the completed 150-question bank exactly matches the official 12% / 22% / 18% / 28% / 20% domain weights.

## Cumulative domain coverage

| Domain | Before | Added | Final total | Final share | Exam weight |
|---|---:|---:|---:|---:|---:|
| 1.0 General Security Concepts | 16 | 2 | 18 | 12.0% | 12% |
| 2.0 Threats, Vulnerabilities, and Mitigations | 26 | 7 | 33 | 22.0% | 22% |
| 3.0 Security Architecture | 21 | 6 | 27 | 18.0% | 18% |
| 4.0 Security Operations | 37 | 5 | 42 | 28.0% | 28% |
| 5.0 Security Program Management and Oversight | 26 | 4 | 30 | 20.0% | 20% |

## Question-by-question review

| ID | Objective | Topic | Quality finding |
|---|---|---|---|
| SEC701-0000127 | 1.2 | Availability through redundancy | The redundant power design directly supports continued service and tests availability without conflating it with authorization or confidentiality. |
| SEC701-0000128 | 1.4 | Keyed message authentication | The shared-secret and non-public-verification requirements distinguish HMAC from unkeyed hashes, certificate status, and bulk encryption. |
| SEC701-0000129 | 2.1 | Competitor threat actors | The stolen bid data benefits a rival seeking commercial advantage, providing a clear competitor actor and motivation. |
| SEC701-0000130 | 2.2 | Pretexting | The detailed false audit story is the mechanism used to induce disclosure, which is specifically pretexting. |
| SEC701-0000131 | 2.3 | Directory traversal | Parent-directory sequences escape the intended path, providing the defining directory-traversal facts. |
| SEC701-0000132 | 2.3 | Insecure deserialization | Server-side reconstruction of an attacker-controlled object triggers behavior during deserialization, clearly separating the weakness from browser attacks. |
| SEC701-0000133 | 2.4 | On-path attack indicators | Gateway MAC instability and certificate warnings jointly support local traffic interception through ARP poisoning. |
| SEC701-0000134 | 2.4 | Ransomware indicators | Bulk file rewriting, extension changes, and a payment demand form a strong ransomware indicator set. |
| SEC701-0000135 | 2.5 | Privileged access workstations | The dedicated hardened administrative environment separates privileged credentials from common phishing and browsing exposure. |
| SEC701-0000136 | 3.1 | IoT architecture | The answer accounts for constrained IoT capabilities through inventory, segmentation, restricted communication, and monitoring. |
| SEC701-0000137 | 3.1 | Hybrid cloud architecture | The hybrid design limits raw regulated data, applies least privilege, protects the transfer, and monitors the cross-environment boundary. |
| SEC701-0000138 | 3.2 | Site-to-site VPNs | Encrypted private-network connectivity between branch gateways is the direct site-to-site IPsec use case. |
| SEC701-0000139 | 3.3 | Information rights management | The persistent view, forwarding, printing, copying, and expiration restrictions identify information rights management. |
| SEC701-0000140 | 3.4 | Power resilience | The UPS bridges the generator startup interval and is distinct from recovery sites, load balancing, and data backups. |
| SEC701-0000141 | 3.4 | Continuity tabletop exercises | Discussion-based plan walkthrough without system activation is a tabletop exercise rather than parallel or interruption testing. |
| SEC701-0000142 | 4.2 | Asset tagging | The tag and durable inventory fields establish identification, ownership, location, and lifecycle accountability. |
| SEC701-0000143 | 4.3 | False-positive validation | The response requires evidence-based validation of a possible backported patch before closing, escalating, or accepting the finding. |
| SEC701-0000144 | 4.4 | Immutable security logs | Separate administrative control and immutable remote storage directly preserve evidence when the monitored administrator is compromised. |
| SEC701-0000145 | 4.5 | Network access control posture | Posture assessment followed by normal or remediation-only network placement maps directly to NAC. |
| SEC701-0000146 | 4.9 | Volatile memory analysis | The live volatile evidence requested for fileless and injected execution is most directly captured in a forensic memory image. |
| SEC701-0000147 | 5.3 | Vendor concentration risk | Multiple critical services depend on one provider, producing concentration risk even when individual services are secure. |
| SEC701-0000148 | 5.4 | Privacy impact assessments | The proposed biometric system requires purpose, collection, sharing, retention, vendor, and safeguard analysis before design decisions are finalized. |
| SEC701-0000149 | 5.5 | Purple-team exercises | The offensive and defensive teams openly collaborate to tune detections and controls, which is the defining purple-team model. |
| SEC701-0000150 | 5.6 | QR-code phishing awareness | The response avoids opening an unverified encoded destination, verifies through an approved channel, and reports the physical phishing lure. |

## Similarity review

- Closest non-duplicate comparison: `SEC701-0000054` and `SEC701-0000126` with similarity score 0.52.
- Closest non-duplicate comparison: `SEC701-0000018` and `SEC701-0000111` with similarity score 0.51.

## Workflow transition

The production bank has reached 150 approved questions. New questions after this batch should return to `draft-questions.csv` with `review_status = review` and should require explicit approval before promotion to `questions.csv`.

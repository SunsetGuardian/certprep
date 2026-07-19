# SEC-701 Batch 002 Critical Review

## Batch summary

- Batch ID: `SEC701-BATCH-002`
- Questions: 20
- IDs: `SEC701-0000011` through `SEC701-0000030`
- Status: `approved`
- New stored-answer distribution: A = 5, B = 5, C = 5, D = 5
- New difficulty distribution: easy = 6, medium = 10, hard = 4
- Exact duplicate stems: none
- Duplicate concept keys: none
- Exact or reversed-clause duplicate answer choices: none

The batch supplies one question for each of the 18 objectives that was not represented by the approved starter set. It adds a second question for objectives 2.2 and 3.2 to improve cumulative domain balance. The project owner approved all 20 questions on `2026-07-19`. Across the 30 approved questions, all 28 published objectives now have at least one question.

## Cumulative domain coverage

| Domain | Approved | Review batch | Total | Total share | Exam weight |
|---|---:|---:|---:|---:|---:|
| 1.0 General Security Concepts | 1 | 3 | 4 | 13.3% | 12% |
| 2.0 Threats, Vulnerabilities, and Mitigations | 2 | 4 | 6 | 20.0% | 22% |
| 3.0 Security Architecture | 2 | 3 | 5 | 16.7% | 18% |
| 4.0 Security Operations | 3 | 6 | 9 | 30.0% | 28% |
| 5.0 Security Program Management and Oversight | 2 | 4 | 6 | 20.0% | 20% |

## Question-by-question review

| ID | Objective | Primary concept | Initial quality finding |
|---|---|---|---|
| SEC701-0000011 | 1.1 | Security control classification | The physical barrier and preventive purpose are explicit, so both category and type are defensible. |
| SEC701-0000012 | 1.2 | Zero Trust components | The data-path wording distinguishes the policy enforcement point from the decision and administration components. |
| SEC701-0000013 | 1.3 | Change rollback planning | The stem asks for a reversal procedure, avoiding confusion with impact analysis or scheduling. |
| SEC701-0000014 | 2.1 | Insider threats | Authorized employee access and the stated retaliatory purpose make both actor type and motivation clear. |
| SEC701-0000015 | 2.2 | Supply-chain attacks | Compromise occurs in the vendor build and distribution process, making supply chain uniquely correct. |
| SEC701-0000016 | 2.2 | Message-based social engineering | The phrase 'most specifically' prevents broad phishing terminology from competing with smishing. |
| SEC701-0000017 | 2.3 | Race conditions | The file changes between check and use, providing the defining facts of a TOCTOU race. |
| SEC701-0000018 | 3.1 | Container architecture | The question tests a real architecture distinction without claiming containers provide no isolation. |
| SEC701-0000019 | 3.2 | DMZ architecture | The required flow and trust boundaries make the DMZ plus internal database design clearly strongest. |
| SEC701-0000020 | 3.2 | Failure modes | The requirement explicitly denies unvalidated access, so fail-closed is not a judgment call. |
| SEC701-0000021 | 4.1 | Application allowlisting | Unknown malware is included to distinguish allowlisting from signature-based denylisting. |
| SEC701-0000022 | 4.2 | Media sanitization | The stem supplies the conditions needed for cryptographic erase and requires hardware reuse. |
| SEC701-0000023 | 4.4 | SIEM alert tuning | The exception is narrowly scoped, preserving detection outside the authorized scanner context. |
| SEC701-0000024 | 4.5 | Intrusion prevention | Inline automatic blocking is the defining difference between IPS and IDS in this question. |
| SEC701-0000025 | 4.7 | Security automation safeguards | The answer retains automation while adding decision quality and recovery safeguards. |
| SEC701-0000026 | 4.9 | Investigation data sources | The request for exact transmitted bytes makes packet capture more direct than summarized logs. |
| SEC701-0000027 | 5.1 | Governance documents | Mandatory technical parameters under a broader policy identify a standard rather than a procedure. |
| SEC701-0000028 | 5.4 | Privacy and data minimization | The service purpose requires only email, so removing unnecessary sensitive data directly applies minimization. |
| SEC701-0000029 | 5.5 | Penetration testing approaches | The tester has no internal knowledge or access, establishing a black-box assessment. |
| SEC701-0000030 | 5.6 | Phishing awareness | The measured weakness is reporting, and the selected action teaches and remeasures that behavior. |

## Batch-level observations

- No question depends on stored or displayed answer position.
- No question uses all-of-the-above, none-of-the-above, or linked answer labels.
- Scenario questions include the material facts needed to distinguish the intended answer.
- Incorrect-choice explanations state why the choice does not fit and where the concept would apply.
- The new answer-key distribution is deliberately balanced, but technical correctness remains the governing rule.
- The cumulative bank is close to the published domain weights. Domain 4 is slightly high and Domains 2 and 3 remain slightly low, which should guide later batches.

## Approval result

All 20 questions were approved by the project owner on `2026-07-19` and moved into `questions.csv`. `draft-questions.csv` is now header-only. Future batches should continue to use the same review and promotion workflow.

---
layout: layouts/article.njk
title: "Security+ SY0-701 Domain 5: Security Program Management and Oversight"
description: Study Security+ SY0-701 Domain 5 with practical guidance on governance, risk, third parties, compliance, privacy, audits, and security awareness.
permalink: /security-plus/sy0-701/study-guide/security-program-management-oversight/
ogType: article
printable: true
printTitle: "Security+ SY0-701 Domain 5: Security Program Management and Oversight"
author: certHappens
datePublished: 2026-07-23
articleSection: Security+ SY0-701 Domain 5
eyebrow: Security+ Domain 5 guide
lede: Connect policies, risk decisions, vendor oversight, compliance work, and security awareness to the people responsible for each outcome.
breadcrumbs:
  - label: Home
    url: /
  - label: Security+
    url: /security-plus/
  - label: SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
  - label: Security Program Management and Oversight
    url: /security-plus/sy0-701/study-guide/security-program-management-oversight/
toc:
  - id: domain-map
    label: Domain 5 map
  - id: security-governance
    label: Security governance
  - id: risk-management
    label: Risk management
  - id: third-party-risk
    label: Third-party risk
  - id: compliance-privacy
    label: Compliance and privacy
  - id: audits-assessments
    label: Audits and assessments
  - id: security-awareness
    label: Security awareness
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CompTIA Security+
  - SY0-701 Domain 5
  - security governance
  - risk management
  - third-party risk
  - compliance
  - privacy
  - security awareness
relatedLinks:
  - title: Security+ SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
    description: Return to the full exam roadmap, domain priorities, and study plan.
  - title: "Domain 4: Security Operations"
    url: /security-plus/sy0-701/study-guide/security-operations/
    description: Review secure administration, vulnerability management, monitoring, IAM, incident response, and investigations.
  - title: Take a randomized SY0-701 practice test
    url: /security-plus/sy0-701/practice-test/
    description: Apply governance, risk, and compliance concepts in mixed practice sessions.
---
Domain 5 accounts for 20 percent of the SY0-701 exam. It explains how an organization decides what security should accomplish, who owns each decision, how risk is tracked, and how requirements are proven to customers, regulators, auditors, and leadership.

The questions often begin with a technical problem but end with an organizational choice. A vulnerability may need a risk owner. A vendor may need contract language. A policy violation may require an exception process. Look for the person with authority, the document that sets expectations, and the evidence that shows the work occurred.

<h2 id="domain-map">Domain 5 map</h2>

The official objectives divide Security Program Management and Oversight into six areas:

<div class="table-scroll" role="region" aria-label="Security+ SY0-701 Domain 5 objective map" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Objective</th><th scope="col">Main focus</th><th scope="col">Questions to ask</th></tr>
    </thead>
    <tbody>
      <tr><td>5.1</td><td>Security governance</td><td>Which document, structure, or role sets direction and accountability?</td></tr>
      <tr><td>5.2</td><td>Risk management</td><td>How is risk identified, analyzed, assigned, treated, and reported?</td></tr>
      <tr><td>5.3</td><td>Third-party risk</td><td>What should be checked before selection, written into agreements, and monitored afterward?</td></tr>
      <tr><td>5.4</td><td>Compliance and privacy</td><td>Which obligation applies, what evidence is required, and whose data or rights are involved?</td></tr>
      <tr><td>5.5</td><td>Audits and assessments</td><td>Who is evaluating the environment, for what purpose, and with what level of independence?</td></tr>
      <tr><td>5.6</td><td>Security awareness</td><td>What behavior should people recognize, report, and improve through training?</td></tr>
    </tbody>
  </table>
</div>

A single scenario can touch several rows. A new cloud provider may require due diligence, a contract, privacy review, risk acceptance, employee guidance, and an independent assessment. Follow the decision path instead of assigning the entire scenario to one objective number.

<h2 id="security-governance">Security governance</h2>

Governance translates business priorities and obligations into direction for the security program. Leadership establishes expectations, assigns authority, and reviews whether the program is producing acceptable results.

<h3>Policies, standards, procedures, and guidelines</h3>

These documents differ by purpose:

<div class="table-scroll" role="region" aria-label="Governance document comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Document</th><th scope="col">Purpose</th><th scope="col">Example</th></tr></thead>
    <tbody>
      <tr><td>Policy</td><td>States management direction and required outcomes.</td><td>Company data must be classified and protected according to sensitivity.</td></tr>
      <tr><td>Standard</td><td>Defines a mandatory, measurable requirement that supports policy.</td><td>Administrative accounts must use phishing-resistant multifactor authentication.</td></tr>
      <tr><td>Procedure</td><td>Lists the steps for completing a task consistently.</td><td>Disable accounts, recover devices, transfer files, and record approval during offboarding.</td></tr>
      <tr><td>Guideline</td><td>Provides recommended practices when judgment or flexibility is appropriate.</td><td>Prefer approved collaboration tools when sharing large internal files.</td></tr>
    </tbody>
  </table>
</div>

A policy should remain broad enough to survive routine technology changes. Standards and procedures usually need more frequent revision because they contain specific controls, thresholds, tools, or steps.

Common policy subjects include acceptable use, information security, business continuity, disaster recovery, incident response, software development, and change management. Standards may define password, access-control, physical-security, and encryption requirements. Procedures cover repeatable work such as onboarding, offboarding, change approval, and incident playbooks.

<h3>External considerations</h3>

Governance must account for requirements beyond the organization. These may come from:

- Laws and regulations
- Contracts and customer commitments
- Industry standards
- Local or regional rules
- National requirements
- Global obligations that follow the organization, service, or data

The same activity can be subject to several requirements. A healthcare provider using an international cloud service may have contractual, sector, national, and cross-border obligations at the same time. The exam usually asks which source creates the requirement or which action best demonstrates compliance.

<h3>Monitoring and revision</h3>

Policies lose value when they no longer match the environment. Review can be triggered by:

- A scheduled review date
- A major incident
- A new law or contractual obligation
- A merger, acquisition, or organizational change
- New technology or a changed threat
- Audit findings
- Repeated exceptions or violations

Revision should include ownership, approval, version control, communication, and acknowledgement where appropriate. An updated document sitting quietly in a repository has not changed anyone's behavior.

<h3>Governance structures</h3>

Governance may be centralized, decentralized, or a mixture of both.

<div class="table-scroll" role="region" aria-label="Security governance structures" tabindex="0">
  <table>
    <thead><tr><th scope="col">Structure</th><th scope="col">Typical role</th><th scope="col">Consideration</th></tr></thead>
    <tbody>
      <tr><td>Board</td><td>Provides oversight, approves risk direction, and holds leadership accountable.</td><td>Receives concise reporting focused on business exposure and decisions.</td></tr>
      <tr><td>Committee</td><td>Coordinates stakeholders, reviews policy, risk, exceptions, or program performance.</td><td>Membership should match the decisions the committee is expected to make.</td></tr>
      <tr><td>Government entity</td><td>Creates, enforces, or examines legal and regulatory requirements.</td><td>Authority depends on jurisdiction and subject matter.</td></tr>
      <tr><td>Centralized model</td><td>Places policy and major decisions under one security function.</td><td>Promotes consistency but can become distant from local operational needs.</td></tr>
      <tr><td>Decentralized model</td><td>Distributes authority among business units or locations.</td><td>Supports local decisions but requires coordination and common minimum requirements.</td></tr>
    </tbody>
  </table>
</div>

<h3>Roles for systems and data</h3>

The exact titles vary among organizations and laws, but the responsibilities remain useful:

<div class="table-scroll" role="region" aria-label="System and data governance roles" tabindex="0">
  <table>
    <thead><tr><th scope="col">Role</th><th scope="col">Primary responsibility</th></tr></thead>
    <tbody>
      <tr><td>Owner</td><td>Accepts accountability, sets classification or access expectations, and approves major decisions for the system or data.</td></tr>
      <tr><td>Controller</td><td>Determines why and how personal data is processed in a privacy context.</td></tr>
      <tr><td>Processor</td><td>Processes personal data on behalf of a controller and within the agreed instructions.</td></tr>
      <tr><td>Custodian</td><td>Implements and operates the technical or administrative protections selected by the owner.</td></tr>
      <tr><td>Steward</td><td>Supports data quality, definitions, handling, and consistent use across a business area.</td></tr>
    </tbody>
  </table>
</div>

Read the task in the scenario. The owner generally makes or approves the business decision. The custodian performs day-to-day protection. A controller selects the purpose and means of personal-data processing, while a processor acts for the controller.

<h2 id="risk-management">Risk management</h2>

Risk management helps an organization make consistent decisions under uncertainty. The process usually includes identification, assessment, response, communication, and continued monitoring.

<h3>Risk identification and assessment timing</h3>

Risks can arise from threats, vulnerabilities, business dependencies, people, suppliers, facilities, technology, and changes in the operating environment.

Assessments may be:

- **Ad hoc:** initiated by an event, request, or unexpected concern
- **One-time:** completed for a specific decision or project
- **Recurring:** repeated on a schedule
- **Continuous:** updated as conditions and evidence change

The best timing depends on the decision. A yearly review may suit a stable process, while internet exposure, active exploitation, or a rapidly changing cloud environment may require continuous monitoring.

<h3>Qualitative and quantitative analysis</h3>

Qualitative analysis uses descriptive ratings such as low, moderate, and high. It works well when precise financial data is unavailable or the organization needs a fast, consistent ranking.

Quantitative analysis uses numbers to estimate frequency and loss. Common Security+ formulas are:

- **Single loss expectancy (SLE) = asset value × exposure factor**
- **Annualized loss expectancy (ALE) = SLE × annualized rate of occurrence (ARO)**

Example: A system valued at $200,000 could lose 25 percent of its value during one event. The SLE is $50,000. If the event is expected once every four years, the ARO is 0.25 and the ALE is $12,500.

Those numbers support comparison. They do not remove uncertainty. Asset value, probability, exposure, and impact estimates all depend on assumptions that should be documented.

<div class="table-scroll" role="region" aria-label="Risk analysis terms" tabindex="0">
  <table>
    <thead><tr><th scope="col">Term</th><th scope="col">Meaning</th></tr></thead>
    <tbody>
      <tr><td>Probability</td><td>A numerical expression of how likely an event is to occur.</td></tr>
      <tr><td>Likelihood</td><td>A judgment or rating describing the chance of occurrence.</td></tr>
      <tr><td>Exposure factor</td><td>The percentage of asset value expected to be lost from one event.</td></tr>
      <tr><td>Impact</td><td>The harm to operations, finances, safety, customers, reputation, obligations, or other objectives.</td></tr>
      <tr><td>SLE</td><td>The estimated loss from one occurrence.</td></tr>
      <tr><td>ARO</td><td>The expected number of occurrences during one year.</td></tr>
      <tr><td>ALE</td><td>The estimated annual loss from the risk.</td></tr>
    </tbody>
  </table>
</div>

<h3>Risk register and ownership</h3>

A risk register records the information needed to manage known risks. Common fields include:

- Description and affected assets or processes
- Threat, vulnerability, and potential impact
- Likelihood and severity
- Existing controls
- Planned response
- Risk owner
- Target dates and current status
- Residual risk after treatment
- Key risk indicators and thresholds

A **risk owner** has authority and accountability for the response. The security team may identify and explain a risk, but a business owner often decides whether to accept disruption, spend money, change a process, or stop an activity.

A **key risk indicator (KRI)** provides an early warning that exposure is changing. Examples include unpatched critical systems, excessive privileged accounts, failed backups, overdue vendor reviews, or rising phishing-report rates.

A **risk threshold** marks a point that triggers action or escalation. It might be a number of overdue critical findings, a maximum outage duration, or a financial exposure limit.

<h3>Appetite and tolerance</h3>

- **Risk appetite** describes the amount and type of risk an organization is willing to pursue or retain while meeting its objectives.
- **Risk tolerance** describes the acceptable variation around a specific objective or risk.

An expansionary appetite accepts more uncertainty in exchange for growth or opportunity. A conservative appetite favors protection and predictability. A neutral posture balances opportunity and exposure without leaning strongly in either direction.

<h3>Risk responses</h3>

<div class="table-scroll" role="region" aria-label="Risk response strategies" tabindex="0">
  <table>
    <thead><tr><th scope="col">Response</th><th scope="col">Meaning</th><th scope="col">Example</th></tr></thead>
    <tbody>
      <tr><td>Mitigate</td><td>Reduce likelihood, impact, or both through controls.</td><td>Add segmentation, stronger authentication, monitoring, and tested recovery.</td></tr>
      <tr><td>Transfer</td><td>Shift part of the financial or operational consequence to another party.</td><td>Purchase insurance or use a contract that assigns defined responsibilities.</td></tr>
      <tr><td>Avoid</td><td>Stop the activity that creates the risk.</td><td>Do not launch a service that cannot meet a required legal or safety condition.</td></tr>
      <tr><td>Accept</td><td>Acknowledge the remaining risk and continue with authorized approval.</td><td>Keep a low-impact legacy dependency until its scheduled replacement.</td></tr>
    </tbody>
  </table>
</div>

An **exception** authorizes a documented deviation from a requirement, often for a limited time and with compensating controls. An **exemption** releases a defined system, group, or situation from a requirement when the requirement does not apply or cannot reasonably be imposed. Both should have approval, scope, rationale, review, and expiration or reassessment conditions.

<h3>Risk reporting and business impact analysis</h3>

Reports should match the audience. Engineers may need affected systems and remediation detail. Executives need business exposure, trend, ownership, cost, and decisions requiring approval.

A business impact analysis identifies critical activities, dependencies, and the effects of disruption. Key measurements include:

<div class="table-scroll" role="region" aria-label="Business impact and reliability measurements" tabindex="0">
  <table>
    <thead><tr><th scope="col">Measurement</th><th scope="col">Question it answers</th></tr></thead>
    <tbody>
      <tr><td>RTO</td><td>How quickly must the service be restored after disruption?</td></tr>
      <tr><td>RPO</td><td>How much data loss, measured in time, can the organization tolerate?</td></tr>
      <tr><td>MTTR</td><td>How long does repair or recovery usually take?</td></tr>
      <tr><td>MTBF</td><td>How long does the system usually operate between failures?</td></tr>
    </tbody>
  </table>
</div>

RTO and RPO are objectives chosen by the organization. MTTR and MTBF are measurements based on performance and reliability history.

<h2 id="third-party-risk">Third-party risk</h2>

Vendors, suppliers, managed service providers, contractors, cloud providers, and software dependencies can introduce access, availability, privacy, and supply-chain risk. Oversight continues after a contract is signed.

<h3>Assessment and selection</h3>

Vendor due diligence may review:

- Security questionnaires and supporting evidence
- Independent assessments or certifications
- Internal audit evidence
- Penetration-test summaries
- Architecture, data flows, and access requirements
- Incident history and response capability
- Business continuity and recovery arrangements
- Subcontractors and supply-chain dependencies
- Financial stability and staffing
- Data location, retention, return, and destruction
- Conflicts of interest

A right-to-audit clause preserves the customer's ability to inspect or obtain evidence under defined conditions. It does not replace normal monitoring. An annual report can become outdated after a major platform, ownership, or control change.

<h3>Agreement types</h3>

<div class="table-scroll" role="region" aria-label="Common third-party agreement types" tabindex="0">
  <table>
    <thead><tr><th scope="col">Agreement</th><th scope="col">Typical purpose</th></tr></thead>
    <tbody>
      <tr><td>SLA</td><td>Defines measurable service expectations such as uptime, response, recovery, support, and remedies.</td></tr>
      <tr><td>MOA</td><td>Describes a formal agreement and responsibilities between parties working toward a shared objective.</td></tr>
      <tr><td>MOU</td><td>Records mutual understanding and intended cooperation, often with less contractual detail.</td></tr>
      <tr><td>MSA</td><td>Establishes the general legal and commercial terms governing an ongoing relationship.</td></tr>
      <tr><td>SOW or work order</td><td>Defines the specific work, deliverables, schedule, scope, and acceptance criteria.</td></tr>
      <tr><td>NDA</td><td>Restricts use and disclosure of confidential information.</td></tr>
      <tr><td>BPA</td><td>Defines obligations between business partners, including information sharing and protection.</td></tr>
    </tbody>
  </table>
</div>

The name offers a clue, but the scenario's purpose decides the answer. A service uptime target belongs in an SLA. Project deliverables belong in an SOW. Confidentiality obligations belong in an NDA.

<h3>Monitoring and rules of engagement</h3>

Ongoing vendor monitoring may track service performance, incidents, control changes, audit reports, insurance, financial condition, vulnerabilities, subcontractors, and compliance obligations.

Rules of engagement define the boundaries for testing or other sensitive activity. They may specify:

- Authorized systems and dates
- Allowed and prohibited methods
- Contacts and escalation paths
- Data-handling requirements
- Conditions for stopping the activity
- Reporting and evidence expectations

Clear scope protects both parties. A penetration tester with vague authorization can create an incident while trying to evaluate one.

<h3>Exit planning</h3>

Vendor risk also appears at termination. The organization may need to revoke access, recover assets, transfer data, verify deletion, preserve records, replace dependencies, and continue critical services. Exit requirements belong in planning and contracts before the relationship becomes difficult to unwind.

<h2 id="compliance-privacy">Compliance and privacy</h2>

Compliance work connects obligations to controls, evidence, monitoring, and reporting. Requirements may be legal, regulatory, contractual, industry-based, or internally adopted.

<h3>Reporting and consequences</h3>

Internal reporting supports leadership, governance committees, audit teams, risk owners, and operational management. External reporting may go to regulators, customers, partners, insurers, or independent assessors.

Consequences of non-compliance can include:

- Fines and sanctions
- Contract penalties or termination
- Loss of license or authorization
- Required remediation or increased oversight
- Reputational damage
- Operational restrictions

The correct response depends on the source of the obligation. A contract breach and a regulatory violation can involve different notice, evidence, and escalation paths even when the underlying control failed in the same way.

<h3>Due care and due diligence</h3>

**Due care** is the reasonable protection and action expected under the circumstances. **Due diligence** is the continuing effort to investigate, verify, and monitor whether those protections remain appropriate and effective.

Installing a required control can demonstrate care. Reviewing alerts, testing effectiveness, updating the control, and responding to findings demonstrate diligence over time.

<h3>Attestation and acknowledgement</h3>

An attestation is a formal assertion that specified conditions or controls are true. Acknowledgement records that a person received, read, or accepted an expectation such as a policy or code of conduct.

Neither should be treated as automatic proof of effective behavior. Evidence still needs suitable scope, timing, authority, and supporting detail.

<h3>Automated compliance monitoring</h3>

Automation can compare configurations against benchmarks, collect evidence, track exceptions, identify drift, and generate reports. It improves consistency and speed, but the organization still needs to validate data sources, tune rules, protect the monitoring system, and investigate results.

<h3>Privacy roles and data lifecycle</h3>

Privacy obligations vary by jurisdiction. For the exam, focus on the roles and management concepts rather than memorizing every law.

- A **data subject** is the person associated with personal data.
- A **controller** determines the purpose and means of processing.
- A **processor** handles data for the controller.
- Data ownership and stewardship establish organizational accountability.
- A data inventory records what personal data exists, where it resides, why it is used, who receives it, and how long it is retained.
- Retention schedules keep data for a defined business or legal period and support disposal afterward.
- A right to be forgotten or erasure request may require deletion when applicable requirements and exceptions allow it.

Data location matters because processing may cross local, regional, national, and global boundaries. Before moving data, identify the people involved, the purpose, the systems, the recipients, the retention period, and the legal or contractual conditions.

<h2 id="audits-assessments">Audits and assessments</h2>

Audits and assessments examine security from different angles. The exam often distinguishes them by purpose, independence, and method.

<div class="table-scroll" role="region" aria-label="Audit and assessment comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Activity</th><th scope="col">Primary purpose</th></tr></thead>
    <tbody>
      <tr><td>Attestation</td><td>Provides a formal assertion about controls, conditions, or compliance.</td></tr>
      <tr><td>Internal audit</td><td>Evaluates governance, controls, and compliance for the organization using an internal audit function.</td></tr>
      <tr><td>Self-assessment</td><td>Allows a team or organization to compare its own practices with requirements or criteria.</td></tr>
      <tr><td>External audit</td><td>Provides independent review for regulators, customers, certifications, or other stakeholders.</td></tr>
      <tr><td>Regulatory examination</td><td>Uses the authority of a regulator or examiner to review compliance and risk.</td></tr>
      <tr><td>Security assessment</td><td>Evaluates whether controls are present, suitable, and operating as intended.</td></tr>
      <tr><td>Penetration test</td><td>Attempts to exploit weaknesses within an authorized scope to demonstrate attack paths and impact.</td></tr>
    </tbody>
  </table>
</div>

An audit committee helps oversee independence, findings, remediation, and reporting. Independence matters because the team responsible for a control may have difficulty providing an objective evaluation of its own work.

<h3>Penetration-test approaches</h3>

Testing can be physical, offensive, defensive, or integrated. An integrated exercise combines attacker and defender activity to improve both detection and response.

Knowledge of the environment also varies:

<div class="table-scroll" role="region" aria-label="Penetration testing knowledge levels" tabindex="0">
  <table>
    <thead><tr><th scope="col">Approach</th><th scope="col">Tester knowledge</th><th scope="col">Useful for</th></tr></thead>
    <tbody>
      <tr><td>Known environment</td><td>Detailed information, credentials, architecture, or source material is provided.</td><td>Deep coverage and efficient testing of specific controls or components.</td></tr>
      <tr><td>Partially known environment</td><td>Some information or access is provided.</td><td>Balancing realistic discovery with targeted evaluation.</td></tr>
      <tr><td>Unknown environment</td><td>Little or no internal information is provided.</td><td>Testing what an outside attacker could discover and reach.</td></tr>
    </tbody>
  </table>
</div>

Passive reconnaissance gathers information without directly interacting with the target systems when possible. Active reconnaissance sends traffic or queries to learn about hosts, services, and defenses. Active methods are more visible and may create operational risk, which is why authorization and rules of engagement matter.

<h2 id="security-awareness">Security awareness</h2>

Awareness programs help people recognize risk, make safer decisions, and report concerns quickly. A yearly presentation alone cannot address new threats, role changes, remote work, and repeated risky behavior.

<h3>Phishing campaigns</h3>

A useful phishing program teaches people how to:

- Check the sender, destination, request, urgency, and surrounding context
- Avoid using links or phone numbers supplied in a suspicious message
- Verify unusual requests through a trusted channel
- Report the message through the approved process
- Preserve useful information for investigation
- Respond appropriately after clicking, replying, or entering credentials

Simulated campaigns can measure reporting, interaction, and improvement. Metrics should support learning rather than encourage employees to hide mistakes. Fast reporting after a click may reduce harm more than silence from someone worried about being blamed.

<h3>Anomalous behavior</h3>

People should recognize behavior that is:

- **Risky:** knowingly bypassing controls or taking unnecessary exposure
- **Unexpected:** activity that differs from normal role, location, timing, or process
- **Unintentional:** mistakes caused by misunderstanding, distraction, poor design, or missing guidance

An anomaly is a reason to verify, not an automatic verdict about intent. Reporting should give security teams enough information to investigate without encouraging rumors or retaliation.

<h3>User guidance and role-based training</h3>

Training should address the work people actually perform. Common subjects include:

- Policies and employee handbooks
- Password and authentication practices
- Social engineering
- Insider-threat indicators and reporting
- Removable media and cables
- Operational security
- Hybrid and remote work
- Data handling and privacy
- Secure development or administration for technical roles
- Incident and escalation responsibilities

General awareness gives everyone a baseline. Role-based training goes deeper for administrators, developers, executives, help-desk staff, finance teams, investigators, and others with distinct access or decisions.

<h3>Development, execution, and monitoring</h3>

A learning program should identify audiences, desired behavior, content, delivery methods, schedule, ownership, and measures of effectiveness.

Initial training establishes expectations for new personnel or new roles. Recurring training refreshes knowledge and addresses changed threats, policies, and tools. Additional training may follow an incident, audit finding, or pattern of risky behavior.

Useful measures include reporting rates, response time, repeated errors, completion, assessment results, help-desk trends, and incident data. A high completion rate proves attendance. Stronger decisions and earlier reporting show whether the material is working.

<h2 id="exam-traps">Common Domain 5 exam traps</h2>

<h3>Choosing the wrong governance document</h3>

Use the purpose. Management direction belongs in policy. Mandatory detail belongs in a standard. Ordered steps belong in a procedure. Recommended practice belongs in a guideline.

<h3>Assigning every security decision to the security team</h3>

Security staff advise, monitor, and operate controls. Owners and leadership often hold authority to accept business risk, fund remediation, or change an activity.

<h3>Confusing appetite, tolerance, and threshold</h3>

Appetite describes the broad willingness to pursue or retain risk. Tolerance defines acceptable variation for a specific objective. A threshold triggers action or escalation.

<h3>Treating transfer as removal</h3>

Insurance and contracts can shift part of the financial or operational consequence. The organization can still face outages, legal duties, customer harm, and reputation loss.

<h3>Using the agreement name without reading the need</h3>

An SLA sets service targets. An SOW defines specific work. An NDA protects confidential information. Select the document that solves the stated requirement.

<h3>Confusing an audit with a penetration test</h3>

An audit compares evidence with criteria. A penetration test attempts authorized exploitation. Both may find weaknesses, but they answer different questions.

<h3>Measuring awareness only by completion</h3>

Completion records show who attended. Reporting behavior, response quality, and incident trends provide stronger evidence of learning.

<h2 id="review-checklist">Domain 5 review checklist</h2>

Before finishing the domain, confirm that you can:

- Compare policies, standards, procedures, and guidelines.
- Match governance structures and data roles to their responsibilities.
- Explain why policies require monitoring, revision, approval, and communication.
- Distinguish qualitative and quantitative risk analysis.
- Calculate SLE and ALE from asset value, exposure factor, and ARO.
- Describe a risk register, risk owner, KRI, threshold, appetite, and tolerance.
- Compare mitigation, transfer, avoidance, acceptance, exceptions, and exemptions.
- Separate RTO, RPO, MTTR, and MTBF.
- Choose among SLA, MOA, MOU, MSA, SOW, NDA, and BPA.
- Explain vendor assessment, selection, monitoring, rules of engagement, and exit planning.
- Compare due care, due diligence, attestation, and acknowledgement.
- Identify data-subject, controller, processor, owner, custodian, and steward responsibilities.
- Compare internal audits, external audits, self-assessments, regulatory examinations, and penetration tests.
- Distinguish known, partially known, and unknown testing environments.
- Explain passive and active reconnaissance.
- Design awareness activities that support recognition, reporting, and improved behavior.

Use the [randomized SY0-701 practice test](/security-plus/sy0-701/practice-test/) to mix Domain 5 decisions with architecture, operations, and threat scenarios. Governance questions become easier when you identify the authority, requirement, evidence, and business effect before comparing the choices.

<h2 id="official-references">Official references</h2>

The domain scope and weighting are based on the published SY0-701 objectives. The supporting sources below provide primary guidance for governance, risk, supply-chain management, privacy, and learning programs:

- [CompTIA Security+ certification page](https://www.comptia.org/en-us/certifications/security/)
- [CompTIA Security+ SY0-701 exam objectives PDF](https://www.examcompass.com/comptia-certifications/security-plus/comptia-security-plus-sy0-701-exam-objectives.pdf)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [NIST SP 800-30 Rev. 1: Guide for Conducting Risk Assessments](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- [NIST SP 800-161 Rev. 1: Cybersecurity Supply Chain Risk Management Practices](https://csrc.nist.gov/pubs/sp/800/161/r1/final)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [NIST SP 800-50 Rev. 1: Building a Cybersecurity and Privacy Learning Program](https://csrc.nist.gov/pubs/sp/800/50/r1/final)
- [CISA: Recognize and Report Phishing](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing)

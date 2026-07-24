---
layout: layouts/article.njk
title: "Security+ SY0-701 Domain 4: Security Operations"
description: Study Security+ SY0-701 Domain 4 with practical guidance on hardening, assets, vulnerabilities, monitoring, IAM, automation, incident response, and investigations.
permalink: /security-plus/sy0-701/study-guide/security-operations/
ogType: article
printable: true
printTitle: "Security+ SY0-701 Domain 4: Security Operations"
author: certHappens
datePublished: 2026-07-23
articleSection: Security+ SY0-701 Domain 4
eyebrow: Security+ Domain 4 guide
lede: Connect daily security work to the evidence, sequence, and control decisions that make operations effective.
breadcrumbs:
  - label: Home
    url: /
  - label: Security+
    url: /security-plus/
  - label: SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
  - label: Security Operations
    url: /security-plus/sy0-701/study-guide/security-operations/
toc:
  - id: domain-map
    label: Domain 4 map
  - id: secure-computing
    label: Secure computing resources
  - id: asset-management
    label: Asset management
  - id: vulnerability-management
    label: Vulnerability management
  - id: monitoring-alerting
    label: Monitoring and alerting
  - id: enterprise-controls
    label: Enterprise security controls
  - id: identity-access
    label: Identity and access
  - id: automation-orchestration
    label: Automation and orchestration
  - id: incident-response
    label: Incident response
  - id: investigation-data
    label: Investigation data
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CompTIA Security+
  - SY0-701 Domain 4
  - security operations
  - vulnerability management
  - SIEM
  - identity and access management
  - incident response
  - digital forensics
relatedLinks:
  - title: Security+ SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
    description: Return to the full exam roadmap, domain priorities, and study plan.
  - title: "Domain 3: Security Architecture"
    url: /security-plus/sy0-701/study-guide/security-architecture/
    description: Review architecture models, infrastructure controls, data protection, resilience, and recovery.
  - title: "Domain 5: Security Program Management and Oversight"
    url: /security-plus/sy0-701/study-guide/security-program-management-oversight/
    description: Continue with governance, risk, third-party oversight, compliance, audits, privacy, and awareness.
  - title: Take a randomized SY0-701 practice test
    url: /security-plus/sy0-701/practice-test/
    description: Apply operational concepts in 10, 20, 30, or 50-question sessions.
---
Domain 4 carries 28 percent of the SY0-701 exam, the largest share of any domain. The material ranges from secure configuration and access administration to vulnerability management, monitoring, incident response, and investigation data.

The common thread is operational judgment. A tool produces information, but the operator still has to decide what the evidence means, what action belongs next, and how to reduce risk without creating a larger problem.

<h2 id="domain-map">Domain 4 map</h2>

The official objectives divide Security Operations into nine areas:

<div class="table-scroll" role="region" aria-label="Security+ SY0-701 Domain 4 objective map" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Objective</th><th scope="col">Main focus</th><th scope="col">Questions to ask</th></tr>
    </thead>
    <tbody>
      <tr><td>4.1</td><td>Secure computing resources</td><td>How should the system be hardened, managed, and monitored?</td></tr>
      <tr><td>4.2</td><td>Asset management</td><td>Who owns the asset, where is it, and how should it be handled through disposal?</td></tr>
      <tr><td>4.3</td><td>Vulnerability management</td><td>How was the weakness found, how serious is it, and how will remediation be verified?</td></tr>
      <tr><td>4.4</td><td>Monitoring and alerting</td><td>Which data source or tool can reveal the activity, and what should trigger action?</td></tr>
      <tr><td>4.5</td><td>Enterprise security controls</td><td>Which control should be configured or changed to address the stated risk?</td></tr>
      <tr><td>4.6</td><td>Identity and access management</td><td>Who needs access, how should identity be verified, and which permissions are appropriate?</td></tr>
      <tr><td>4.7</td><td>Automation and orchestration</td><td>Which repeatable task should be automated, and what failure or maintenance risk follows?</td></tr>
      <tr><td>4.8</td><td>Incident response</td><td>What phase is the team in, and which action belongs first or next?</td></tr>
      <tr><td>4.9</td><td>Investigation data</td><td>Which source can support the conclusion, and what does it actually prove?</td></tr>
    </tbody>
  </table>
</div>

The exam often combines these areas. A vulnerability finding may lead to patching, a SIEM alert, containment, evidence collection, and an access review. Follow the scenario rather than forcing it into one objective number.

<h2 id="secure-computing">Secure computing resources</h2>

<h3>Baselines, hardening, and configuration control</h3>

A secure baseline defines an approved starting configuration. Hardening removes unnecessary exposure and strengthens the settings that remain. Configuration management keeps the system close to that approved state after deployment.

A practical sequence is:

1. Identify the system's role and required services.
2. Apply an approved image or baseline.
3. Remove or disable unnecessary software, accounts, ports, and protocols.
4. Configure authentication, logging, encryption, and host protections.
5. Patch the system and verify versions.
6. Test the required business function.
7. Monitor for drift and unauthorized changes.

The preferred settings differ by target. A workstation, network switch, cloud workload, server, industrial controller, and mobile device do not share the same operating limits or management tools.

<div class="table-scroll" role="region" aria-label="Computing resource hardening priorities" tabindex="0">
  <table>
    <thead><tr><th scope="col">Resource</th><th scope="col">Common priorities</th></tr></thead>
    <tbody>
      <tr><td>Workstation</td><td>Endpoint protection, patching, disk encryption, restricted local administration, application control, screen locking, and browser security.</td></tr>
      <tr><td>Server</td><td>Minimal services, protected administration, secure service accounts, logging, backups, segmentation, file permissions, and workload-specific hardening.</td></tr>
      <tr><td>Switch or router</td><td>Secure management protocols, restricted administrative access, unused-port shutdown, configuration backups, logging, network segmentation, and current firmware.</td></tr>
      <tr><td>Cloud resource</td><td>Identity policy, network exposure, secrets, encryption, logging, tenant settings, approved images, tagging, and configuration-drift detection.</td></tr>
      <tr><td>ICS, SCADA, or embedded device</td><td>Inventory, segmentation, controlled remote access, safe maintenance windows, passive monitoring where appropriate, and compensating controls for limited patch support.</td></tr>
    </tbody>
  </table>
</div>

Configuration drift occurs when deployed settings move away from the approved baseline. Drift can come from emergency changes, manual troubleshooting, software updates, new dependencies, or an attacker. Comparison scans, configuration-management tools, file-integrity monitoring, and regular audits can expose it.

<h3>Wireless and mobile administration</h3>

A wireless site survey evaluates signal coverage, interference, channel use, access-point placement, and likely dead zones. A heat map turns those measurements into a visual plan. Strong signal outside the intended space can create unnecessary exposure, while weak coverage can encourage users to seek unsafe alternatives.

Use modern wireless protections, strong authentication, protected management interfaces, and separate guest or untrusted traffic from internal resources. Enterprise authentication commonly relies on a centralized AAA service such as RADIUS rather than a shared password known by every user.

Mobile-device management can enforce screen locks, encryption, application rules, remote wipe, and compliance checks. The deployment model affects ownership and privacy:

- **BYOD** allows personally owned devices. The organization needs clear access, privacy, support, and data-removal rules.
- **COPE** provides company-owned devices that may permit personal use. The organization retains stronger management authority.
- **CYOD** lets the user choose from an approved device list. Support and security remain more predictable than unrestricted BYOD.

<h3>Application protections</h3>

Input validation checks whether supplied data matches expected type, length, format, and range before the application uses it. Secure cookies can use attributes that reduce exposure to script access or unprotected transport. Static analysis reviews source code without running it. Code signing helps recipients verify the publisher and detect unauthorized modification.

Sandboxing limits what a process or untrusted file can reach. Monitoring then looks for behavior that escapes expectations. These controls serve different purposes, so the scenario clue matters.

<h2 id="asset-management">Asset management</h2>

Security decisions depend on knowing what exists. An unmanaged system can miss patches, logging, backup, access review, and incident-response coverage.

The asset lifecycle includes acquisition, assignment, operation, transfer, and disposal:

<div class="table-scroll" role="region" aria-label="Asset lifecycle security activities" tabindex="0">
  <table>
    <thead><tr><th scope="col">Stage</th><th scope="col">Security work</th></tr></thead>
    <tbody>
      <tr><td>Acquisition</td><td>Evaluate supplier risk, support life, security features, licensing, integration, and maintenance requirements before purchase.</td></tr>
      <tr><td>Assignment</td><td>Record owner or custodian, user, location, classification, serial number, and approved purpose.</td></tr>
      <tr><td>Operation</td><td>Track inventory, configuration, patches, software, data, access, location, and maintenance status.</td></tr>
      <tr><td>Transfer</td><td>Update custody, permissions, business owner, location, and handling requirements.</td></tr>
      <tr><td>Disposal</td><td>Remove data through approved sanitization or destruction, document the action, and update inventory records.</td></tr>
    </tbody>
  </table>
</div>

Ownership identifies who is accountable for decisions about the asset. A custodian may operate or protect it on the owner's behalf. Classification determines handling requirements. Monitoring and asset tracking help the organization detect loss, unauthorized movement, and unsupported equipment.

Data retention rules determine how long information must remain available. When retention ends, disposal should match the media and sensitivity. Clearing may be sufficient for reuse in a low-risk context. Purging uses stronger methods intended to make recovery impractical. Physical destruction may be appropriate when media cannot be trusted, reused, or sanitized reliably. A certificate of destruction records what was destroyed, when, and by whom.

<h2 id="vulnerability-management">Vulnerability management</h2>

Vulnerability management is a cycle: identify, analyze, prioritize, remediate, validate, and report. Finding a weakness is the beginning of the work.

<h3>Identification methods</h3>

- **Vulnerability scans** compare systems and applications with known weaknesses and configuration checks.
- **Application testing** can include static, dynamic, and dependency analysis.
- **Threat intelligence and public sources** identify active campaigns, exposed services, and newly disclosed weaknesses.
- **Penetration testing** attempts to demonstrate exploitable paths under an agreed scope.
- **Bug bounty programs** invite approved external researchers to report weaknesses under defined rules.
- **Audits and process reviews** reveal missing controls, weak procedures, and policy gaps that a technical scanner may never see.

A credentialed scan can inspect installed software and local configuration with more depth. An uncredentialed scan shows what is visible without trusted access. Both can be useful, but they answer different questions.

<h3>Analysis and prioritization</h3>

Confirm whether the finding is real and relevant to the environment. A false positive reports a problem that is absent. A false negative misses a problem that exists.

Severity scores provide a common starting point. They do not replace context. Prioritization should consider:

- Exploit availability and active exploitation
- Internet exposure and network reachability
- Asset value and business criticality
- Existing compensating controls
- Required privileges and user interaction
- Potential effect on confidentiality, integrity, safety, and availability
- Recovery difficulty and operational constraints
- Organizational risk tolerance

A medium-scored weakness on an exposed identity system may deserve action before a higher-scored issue on an isolated test machine. The scanner score is part of the decision, not the whole decision.

<h3>Remediation, exceptions, and validation</h3>

Patching is common, but it is one of several remediation choices. Others include changing configuration, removing software, disabling a feature, segmenting the system, restricting access, replacing the asset, or applying a compensating control.

An exception or exemption should have an owner, reason, scope, expiration or review date, and documented compensating measures. “We cannot patch it” describes a constraint. It does not complete the risk decision.

After remediation, rescan or retest. Confirm that the weakness is closed and the business function still works. Report status in a form that helps technical teams act and leaders understand remaining risk.

<h2 id="monitoring-alerting">Monitoring and alerting</h2>

Monitoring collects evidence from systems, applications, networks, cloud services, and security tools. Alerting identifies conditions that deserve attention. Useful monitoring balances visibility with storage, cost, privacy, and analyst capacity.

<div class="table-scroll" role="region" aria-label="Security monitoring tools and uses" tabindex="0">
  <table>
    <thead><tr><th scope="col">Tool or data</th><th scope="col">Useful for</th></tr></thead>
    <tbody>
      <tr><td>SIEM</td><td>Aggregating, normalizing, correlating, searching, and alerting across many log sources.</td></tr>
      <tr><td>Endpoint protection</td><td>Detecting malware, suspicious processes, persistence, credential abuse, and endpoint behavior.</td></tr>
      <tr><td>DLP</td><td>Identifying and controlling sensitive data movement through endpoints, networks, applications, or cloud services.</td></tr>
      <tr><td>SNMP trap</td><td>Receiving device-generated notifications about status, faults, or threshold conditions.</td></tr>
      <tr><td>NetFlow</td><td>Summarizing communication patterns such as source, destination, protocol, ports, and volume without full packet content.</td></tr>
      <tr><td>Vulnerability scanner</td><td>Finding known weaknesses, missing patches, exposed services, and configuration issues.</td></tr>
    </tbody>
  </table>
</div>

Log aggregation supports centralized search and retention. Time synchronization is essential because events from different systems must line up. Archiving preserves data for investigation, compliance, and trend analysis. Reporting turns the collected data into findings, metrics, or decisions.

An alert should describe a meaningful condition. Poorly tuned alerts create noise, and noise trains people to ignore the system. Establish thresholds, severity, ownership, escalation paths, and response playbooks. Review alerts that repeatedly close as harmless and detections that failed to fire during known events.

<h2 id="enterprise-controls">Enterprise security controls</h2>

Operational questions may ask which capability should be configured or changed.

- **Firewalls** enforce rules based on addresses, ports, protocols, applications, identities, or connection state.
- **IDS and IPS** detect suspicious traffic; an IPS can also block or alter the flow.
- **Web filters** restrict destinations, categories, downloads, or risky content.
- **DNS filters** block or redirect requests for known malicious or disallowed domains.
- **Email protections** use gateways, content inspection, reputation, sandboxing, and sender-authentication controls such as SPF, DKIM, and DMARC.
- **File-integrity monitoring** alerts when protected files change.
- **DLP** applies policy to sensitive information movement.
- **NAC** evaluates devices or users before granting network access and may place them into restricted segments.
- **EDR and XDR** collect and analyze endpoint or cross-domain telemetry, then support investigation and response.
- **Behavior analytics** look for activity that differs from expected patterns for users, entities, or systems.

Choose the control closest to the stated problem. A web application firewall addresses web-request patterns. An endpoint control addresses process and host behavior. A DNS filter blocks domain resolution. Several controls may contribute, but the exam still expects the most direct fit.

<h2 id="identity-access">Identity and access management</h2>

Identity administration begins before access is granted and continues until every account, token, key, and session is removed or transferred.

<h3>Lifecycle and proofing</h3>

Provision accounts from an approved request. Assign only the access required for the role. Review permissions when duties change. Deprovision promptly at separation, including remote access, cloud roles, service integrations, physical credentials, API keys, and shared resources.

Identity proofing establishes that the applicant is the person or entity claimed. Authentication later verifies control of an enrolled authenticator. Federation lets one identity provider supply assertions to another service. Single sign-on reduces repeated authentication, while also increasing the importance of protecting the central identity system.

Attestation is a formal confirmation that access or identity information remains appropriate. Managers and data owners should understand what they are approving rather than treating the review as a checkbox exercise.

<h3>Access-control models</h3>

<div class="table-scroll" role="region" aria-label="Access control models" tabindex="0">
  <table>
    <thead><tr><th scope="col">Model</th><th scope="col">Decision basis</th></tr></thead>
    <tbody>
      <tr><td>DAC</td><td>The resource owner controls permissions, commonly through user and group assignments.</td></tr>
      <tr><td>MAC</td><td>Central policy compares security labels and clearances; ordinary owners cannot freely change access.</td></tr>
      <tr><td>RBAC</td><td>Permissions follow job roles or functions.</td></tr>
      <tr><td>ABAC</td><td>Policy evaluates attributes such as user, device, resource, location, sensitivity, and risk.</td></tr>
      <tr><td>Rule-based</td><td>System rules evaluate conditions such as network, time, protocol, or event state.</td></tr>
    </tbody>
  </table>
</div>

Multifactor authentication combines independent factor types, such as something you know, have, or are. Two passwords are two instances of the same factor type. Contextual attributes such as location, device health, or behavior can influence a risk decision but should not be confused with an independent authentication factor.

Privileged access management controls elevated accounts through vaulting, approval, session recording, just-in-time access, and credential rotation. Passwordless systems use other authenticators such as device-bound cryptographic credentials or biometrics backed by secure hardware.

<h2 id="automation-orchestration">Automation and orchestration</h2>

Automation performs a repeatable task. Orchestration connects several tasks, tools, and decisions into a workflow.

Useful cases include provisioning users and resources, applying guardrails, updating security groups, creating tickets, escalating alerts, disabling accounts, running CI/CD checks, collecting evidence, and calling services through APIs.

Benefits include faster response, consistent baselines, repeatable configuration, secure scaling, reduced manual work, and better use of limited staff. Those benefits depend on reliable inputs and safe failure behavior.

Review the risks:

- A bad rule can spread at machine speed.
- One unavailable orchestration platform can block many workflows.
- Complex integrations create maintenance and testing work.
- Service accounts and API tokens can become highly privileged targets.
- Old automation can preserve technical debt long after its original owner leaves.

Use version control, peer review, test environments, scoped identities, logging, rollback, and manual approval for high-impact actions.

<h2 id="incident-response">Incident response</h2>

Security+ scenarios commonly use the sequence **preparation, detection, analysis, containment, eradication, recovery, and lessons learned**. Real response work may move between activities, but the sequence helps identify the requested action.

<div class="table-scroll" role="region" aria-label="Incident response activities" tabindex="0">
  <table>
    <thead><tr><th scope="col">Activity</th><th scope="col">Purpose</th></tr></thead>
    <tbody>
      <tr><td>Preparation</td><td>Create plans, roles, communications, tools, access, backups, training, and response agreements before an incident.</td></tr>
      <tr><td>Detection</td><td>Recognize a possible event through alerts, reports, logs, or observed behavior.</td></tr>
      <tr><td>Analysis</td><td>Validate the incident, establish scope and impact, identify affected assets, and prioritize the response.</td></tr>
      <tr><td>Containment</td><td>Limit spread or damage while preserving the ability to investigate and continue critical operations.</td></tr>
      <tr><td>Eradication</td><td>Remove malicious code, persistence, compromised accounts, unsafe configuration, and the root cause where possible.</td></tr>
      <tr><td>Recovery</td><td>Restore trusted systems and services, monitor closely, and confirm that business operations can resume.</td></tr>
      <tr><td>Lessons learned</td><td>Review decisions, evidence, communications, controls, and process changes after the immediate response.</td></tr>
    </tbody>
  </table>
</div>

Containment and eradication are easy to confuse. Isolating a compromised host limits further activity. Reimaging it or removing persistence addresses the compromise. Recovery returns the service to operation after the team has enough confidence in its state.

Tabletop exercises walk participants through a scenario and decision process. Simulations create more realistic technical or operational activity. Root-cause analysis asks why the incident was possible, not merely which malware name appeared. Threat hunting proactively searches for hidden activity that existing alerts may have missed.

<h3>Forensics and evidence handling</h3>

A legal hold directs the organization to preserve relevant information. Chain of custody records who collected, possessed, transferred, analyzed, and stored evidence. Acquisition should use appropriate methods and preserve original data where possible. Hashes can support integrity verification for acquired images or files.

Evidence handling should account for order of volatility. Memory, running processes, active network connections, and temporary data may disappear before powered-off storage. The correct collection order depends on the situation, safety, legal authority, and available expertise.

Reporting explains methods, findings, limits, and conclusions. E-discovery identifies, preserves, collects, reviews, and produces electronically stored information for legal matters.

<h2 id="investigation-data">Investigation data</h2>

Different sources answer different questions:

<div class="table-scroll" role="region" aria-label="Investigation data sources" tabindex="0">
  <table>
    <thead><tr><th scope="col">Source</th><th scope="col">Possible evidence</th></tr></thead>
    <tbody>
      <tr><td>Firewall log</td><td>Allowed or denied connections, addresses, ports, protocols, rule matches, and session timing.</td></tr>
      <tr><td>Application log</td><td>Authentication, errors, transactions, API calls, authorization decisions, and application-specific events.</td></tr>
      <tr><td>Endpoint log</td><td>Processes, files, users, persistence, detections, device activity, and response actions.</td></tr>
      <tr><td>Operating-system security log</td><td>Account use, privilege changes, logons, service activity, policy events, and audit records.</td></tr>
      <tr><td>IDS or IPS alert</td><td>Traffic that matched a signature or behavior rule, including source, destination, and detection details.</td></tr>
      <tr><td>Network flow</td><td>Communication patterns, volume, direction, ports, protocols, and timing without full content.</td></tr>
      <tr><td>Packet capture</td><td>Detailed network headers and payloads when traffic is available and not protected by encryption.</td></tr>
      <tr><td>Metadata</td><td>Context such as timestamps, owner, device, location, sender, recipient, file type, or message routing.</td></tr>
      <tr><td>Vulnerability scan</td><td>Known weaknesses and configuration findings present at the time of the scan.</td></tr>
    </tbody>
  </table>
</div>

Dashboards and automated reports summarize data. They are useful starting points, but the underlying event should be reviewed when a decision depends on detail. A missing log entry does not automatically prove that an action never occurred. Logging may have been disabled, delayed, filtered, overwritten, or collected elsewhere.

<h2 id="exam-traps">Common Domain 4 exam traps</h2>

<h3>Choosing a tool instead of an action</h3>

A SIEM can correlate logs, but “use a SIEM” may not answer what the analyst should do next. Identify the operational decision the scenario requests.

<h3>Treating a vulnerability score as the final priority</h3>

Use severity with exploit activity, exposure, asset criticality, business effect, and compensating controls.

<h3>Skipping validation after remediation</h3>

A ticket marked complete does not prove the weakness is gone. Rescan, retest, or verify the changed configuration.

<h3>Confusing containment, eradication, and recovery</h3>

Containment limits impact. Eradication removes the cause and persistence. Recovery returns trusted operations.

<h3>Removing evidence before collecting what matters</h3>

Rebooting, wiping, or disconnecting a system can destroy volatile evidence or interrupt collection. Balance evidence needs with safety and business impact.

<h3>Leaving access in place after a role change</h3>

Joiner, mover, and leaver processes all matter. A promoted or transferred employee can accumulate permissions if old access is never removed.

<h2 id="review-checklist">Domain 4 review checklist</h2>

Before moving on, confirm that you can:

- Build a secure baseline and explain how drift is detected.
- Select hardening priorities for endpoints, servers, networks, cloud resources, and specialized systems.
- Compare BYOD, COPE, and CYOD.
- Describe the asset lifecycle from acquisition through sanitized disposal.
- Explain vulnerability identification, prioritization, remediation, validation, and reporting.
- Match SIEM, EDR, DLP, NetFlow, SNMP traps, and vulnerability scanning to their roles.
- Choose among firewall, IDS/IPS, DNS filtering, email controls, NAC, FIM, and behavior analytics.
- Apply identity proofing, federation, SSO, attestation, access models, MFA, and privileged access concepts.
- Explain benefits and failure risks of automation and orchestration.
- Put incident-response activities in a defensible order.
- Explain chain of custody, legal hold, acquisition, preservation, and e-discovery.
- Select useful log and network data for an investigation without claiming more than the evidence proves.

Use the [randomized SY0-701 practice test](/security-plus/sy0-701/practice-test/) to apply these choices in mixed scenarios. Review every answer that felt uncertain, even when the selected option happened to be correct.

Continue with the [Domain 5: Security Program Management and Oversight guide](/security-plus/sy0-701/study-guide/security-program-management-oversight/) for governance, risk ownership, vendor oversight, compliance, audits, privacy, and awareness programs.

<h2 id="official-references">Official references</h2>

The exam scope and domain weighting are based on the published SY0-701 objectives. The supporting sources below provide primary guidance for operational security practices:

- [CompTIA Security+ certification page](https://www.comptia.org/en-us/certifications/security/)
- [CompTIA Security+ SY0-701 exam objectives PDF](https://www.comptia.jp/pdf/CompTIA%20Security%2B%20SY0-701%20Exam%20Objectives.pdf)
- [NIST SP 800-40 Rev. 4: Guide to Enterprise Patch Management Planning](https://csrc.nist.gov/pubs/sp/800/40/r4/final)
- [NIST SP 800-61 Rev. 3: Incident Response Recommendations and Considerations](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

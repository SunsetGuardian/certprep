---
layout: layouts/article.njk
title: "Security+ SY0-701 Domain 2: Threats, Vulnerabilities, and Mitigations"
description: Study Security+ SY0-701 Domain 2 with practical comparisons of threat actors, attack vectors, vulnerabilities, malicious activity, indicators, and mitigations.
permalink: /security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/
ogType: article
printable: true
printTitle: "Security+ SY0-701 Domain 2: Threats, Vulnerabilities, and Mitigations"
author: certHappens
datePublished: 2026-07-23
articleSection: Security+ SY0-701 Domain 2
eyebrow: Security+ Domain 2 guide
lede: Follow an attack from the person or group behind it, through the path they use, to the weakness they exploit and the control that reduces the risk.
breadcrumbs:
  - label: Home
    url: /
  - label: Security+
    url: /security-plus/
  - label: SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
  - label: Threats, Vulnerabilities, and Mitigations
    url: /security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/
toc:
  - id: domain-map
    label: Domain 2 map
  - id: threat-actors
    label: Threat actors and motivations
  - id: vectors-surfaces
    label: Threat vectors and attack surfaces
  - id: vulnerabilities
    label: Vulnerability types
  - id: malicious-activity
    label: Malicious activity and indicators
  - id: mitigations
    label: Mitigation techniques
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CompTIA Security+
  - SY0-701 Domain 2
  - threats vulnerabilities mitigations
  - threat actors
  - social engineering
  - malware
  - vulnerability mitigation
relatedLinks:
  - title: Security+ SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
    description: Return to the full exam roadmap, domain priorities, and study plan.
  - title: "Domain 1: General Security Concepts"
    url: /security-plus/sy0-701/study-guide/general-security-concepts/
    description: Review controls, zero trust, change management, cryptography, and PKI.
  - title: "Domain 3: Security Architecture"
    url: /security-plus/sy0-701/study-guide/security-architecture/
    description: Continue with infrastructure design, data protection, resilience, and recovery planning.
  - title: Take a randomized SY0-701 practice test
    url: /security-plus/sy0-701/practice-test/
    description: Apply these concepts in 10, 20, 30, or 50-question sessions.
---
Domain 2 accounts for 22 percent of the SY0-701 exam. It connects four questions that should stay together during study: **Who might attack, how could they get in, what weakness would help them, and which control addresses the risk?**

Attack names are useful, but scenario details usually decide the answer. A sign-in alert after impossible travel points toward a compromised credential or session. A database error after crafted input points toward injection. A vendor update that arrives through a trusted channel can still be malicious when the supply chain has been compromised.

<h2 id="domain-map">Domain 2 map</h2>

The official objectives divide Threats, Vulnerabilities, and Mitigations into five areas:

<div class="table-scroll" role="region" aria-label="Security+ SY0-701 Domain 2 objective map" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Objective</th>
        <th scope="col">Main focus</th>
        <th scope="col">Questions to ask</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2.1</td>
        <td>Threat actors and motivations</td>
        <td>Who benefits, what resources are available, and what outcome are they seeking?</td>
      </tr>
      <tr>
        <td>2.2</td>
        <td>Threat vectors and attack surfaces</td>
        <td>Which path could carry the attack, and which exposed people, systems, or services are reachable?</td>
      </tr>
      <tr>
        <td>2.3</td>
        <td>Vulnerability types</td>
        <td>What weakness makes the attack possible?</td>
      </tr>
      <tr>
        <td>2.4</td>
        <td>Malicious activity and indicators</td>
        <td>What happened, and which evidence supports that conclusion?</td>
      </tr>
      <tr>
        <td>2.5</td>
        <td>Mitigation techniques</td>
        <td>Which control reduces the stated likelihood, exposure, or impact most directly?</td>
      </tr>
    </tbody>
  </table>
</div>

Use the chain from actor to mitigation when a question feels crowded. The same malware can arrive through several vectors, exploit different vulnerabilities, and call for more than one control. Focus on the link the scenario asks you to identify.

<h2 id="threat-actors">Threat actors and motivations</h2>

A threat actor is the person, group, or organizational behavior that creates risk. The actor's location, resources, skill, and motivation help predict likely targets and methods.

<div class="table-scroll" role="region" aria-label="Threat actors characteristics and motivations" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Threat actor</th>
        <th scope="col">Common characteristics</th>
        <th scope="col">Likely motivations</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Nation-state</strong></td>
        <td>Well funded, patient, capable of long campaigns, and often supported by intelligence resources</td>
        <td>Espionage, strategic advantage, war, disruption, or theft of sensitive research</td>
      </tr>
      <tr>
        <td><strong>Unskilled attacker</strong></td>
        <td>Relies heavily on public tools, copied instructions, or automated scanning</td>
        <td>Curiosity, attention, disruption, challenge, or opportunistic gain</td>
      </tr>
      <tr>
        <td><strong>Hacktivist</strong></td>
        <td>Targets organizations connected to a social, political, or philosophical cause</td>
        <td>Publicity, protest, service disruption, data release, or reputational damage</td>
      </tr>
      <tr>
        <td><strong>Insider threat</strong></td>
        <td>Has legitimate access or knowledge of internal systems, processes, and data</td>
        <td>Financial gain, revenge, coercion, espionage, convenience, or accidental harm</td>
      </tr>
      <tr>
        <td><strong>Organized crime</strong></td>
        <td>Operates for profit with specialized roles, repeatable processes, and access to criminal services</td>
        <td>Ransom, fraud, theft, blackmail, credential resale, or data monetization</td>
      </tr>
      <tr>
        <td><strong>Shadow IT</strong></td>
        <td>Employees or teams use unapproved services, devices, or applications outside normal oversight</td>
        <td>Speed, convenience, missing business capability, or avoidance of a slow approval process</td>
      </tr>
    </tbody>
  </table>
</div>

Shadow IT is usually driven by a business need rather than hostile intent, yet it can expose data and bypass security controls. An unsanctioned file-sharing service may create the same confidentiality problem whether the employee meant harm or simply needed to send a large document.

<h3>Internal and external actors</h3>

An **internal** actor already has some degree of trusted access or organizational knowledge. An **external** actor begins outside that trust boundary. The distinction affects likely evidence and controls.

An external attacker may scan public services and steal credentials. An insider may use approved credentials from an expected location, making entitlement reviews, data-loss prevention, separation of duties, and behavior monitoring especially important.

<h3>Resources, funding, and capability</h3>

Funding influences patience, tooling, infrastructure, and the ability to replace resources after discovery. Sophistication describes capability, although a skilled actor may still choose a simple technique when it works. Password spraying and phishing remain useful because organizations continue to expose accounts and people.

Avoid selecting an actor from one clue alone. A destructive attack could support war, political protest, revenge, extortion, or an attempt to hide evidence. Combine target choice, persistence, method, and requested outcome.

<h3>Motivations</h3>

Common motivations include:

- **Data exfiltration:** Removing data for resale, intelligence, fraud, publication, or later leverage.
- **Espionage:** Quiet collection of government, military, commercial, or personal information.
- **Service disruption:** Preventing normal operations or degrading availability.
- **Blackmail:** Threatening disclosure or harm unless the victim complies.
- **Financial gain:** Ransomware, payment fraud, credential theft, cryptomining, or resale of access.
- **Philosophical or political beliefs:** Promoting a cause, embarrassing a target, or influencing public opinion.
- **Ethical motivation:** Authorized researchers and testers may probe systems to identify weaknesses under agreed rules.
- **Revenge:** Retaliation by a current or former employee, customer, contractor, or other party.
- **Disruption or chaos:** Damage for its own sake or to distract defenders from another objective.
- **War:** Strategic attacks against government, military, communications, logistics, or critical infrastructure.

<div class="article-callout">
  <p><strong>Exam clue:</strong> Motivation can narrow the actor, but it rarely proves identity by itself. Use the full pattern of target, resources, timing, and behavior.</p>
</div>

<h2 id="vectors-surfaces">Threat vectors and attack surfaces</h2>

A **threat vector** is the path used to reach a target. The **attack surface** is the collection of exposed people, devices, applications, services, interfaces, and dependencies that an attacker could target.

Reducing attack surface means removing or restricting unnecessary exposure. Closing an unused port, retiring unsupported software, disabling a default account, and limiting public cloud access all remove opportunities before an attacker chooses a vector.

<div class="table-scroll" role="region" aria-label="Threat vectors examples and defensive clues" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Vector</th>
        <th scope="col">How it reaches the target</th>
        <th scope="col">Useful clues</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Message-based</strong></td>
        <td>Email, SMS, and instant messaging carry links, requests, attachments, or false instructions</td>
        <td>Urgency, credential requests, unexpected attachments, altered sender details</td>
      </tr>
      <tr>
        <td><strong>Image-based</strong></td>
        <td>Images hide links, QR codes, tracking, malicious content, or text intended to evade filtering</td>
        <td>QR-code login prompts, image-only messages, mismatched destination addresses</td>
      </tr>
      <tr>
        <td><strong>File-based</strong></td>
        <td>Documents, archives, installers, scripts, and media files carry malicious code or exploit a parser</td>
        <td>Macros, unexpected file types, double extensions, unsigned installers</td>
      </tr>
      <tr>
        <td><strong>Voice call</strong></td>
        <td>An attacker impersonates support, leadership, a vendor, or a trusted institution</td>
        <td>Requests to reveal codes, reset access, bypass procedure, or act immediately</td>
      </tr>
      <tr>
        <td><strong>Removable device</strong></td>
        <td>USB storage or another portable device introduces files, malware, or unauthorized data movement</td>
        <td>Unknown media, newly mounted devices, execution from removable storage</td>
      </tr>
      <tr>
        <td><strong>Vulnerable software</strong></td>
        <td>An exposed client, server, agent, or agentless interface contains an exploitable flaw</td>
        <td>Known vulnerable version, missing patch, reachable management interface</td>
      </tr>
      <tr>
        <td><strong>Supply chain</strong></td>
        <td>A service provider, vendor, supplier, update channel, component, or dependency is compromised</td>
        <td>Trusted distribution path, valid vendor relationship, widespread downstream impact</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>Unsupported systems and exposed services</h3>

Unsupported systems and applications no longer receive normal security fixes. A legacy device may still perform a required function, but its risk must be addressed through isolation, restrictive access, monitoring, compensating controls, or replacement planning.

Open service ports expand the reachable attack surface. The question is whether the service is required, securely configured, patched, and limited to appropriate sources. Default credentials are especially dangerous because attackers can test them cheaply and at scale.

A **client-based** path depends on software installed on the endpoint, such as a vulnerable application or management agent. An **agentless** path reaches a browser, API, service, or remote-management interface without requiring a resident agent. The label describes how the target is reached; either approach can expose a flaw when the reachable software or interface is vulnerable.

<h3>Unsecure networks</h3>

Wireless, wired, and Bluetooth connections can expose traffic or device access when authentication, encryption, segmentation, and configuration are weak. Watch for evil-twin access points, rogue devices, unauthorized switch connections, weak wireless protocols, discoverable Bluetooth services, and untrusted public networks.

<h3>Social engineering</h3>

Social engineering targets human judgment and organizational process.

- **Phishing:** A broad deceptive message, usually sent by email.
- **Spear phishing:** A tailored message aimed at a specific person or group.
- **Whaling:** Spear phishing aimed at executives or other high-value roles.
- **Vishing:** Voice-based phishing.
- **Smishing:** SMS-based phishing.
- **Impersonation:** Pretending to be a trusted person, support function, vendor, or authority.
- **Business email compromise:** Using a compromised or convincing business identity to redirect payments, data, or sensitive actions.
- **Pretexting:** Building a believable story that gives the request a reason and context.
- **Watering-hole attack:** Compromising a site commonly visited by the intended targets.
- **Brand impersonation:** Copying a known organization's appearance and language.
- **Typosquatting:** Registering a look-alike domain that depends on a misspelling or visual similarity.
- **Misinformation:** Sharing false information without necessarily intending harm.
- **Disinformation:** Deliberately creating or spreading false information to influence behavior.

Verification procedures matter because training alone cannot make every message obvious. Payment changes, password resets, unusual data requests, and requests to bypass normal controls should use an independent confirmation path.

<h2 id="vulnerabilities">Vulnerability types</h2>

A vulnerability is a weakness that can be exploited. A threat actor supplies intent and capability; a vector supplies the path; the vulnerability supplies the opening.

<div class="table-scroll" role="region" aria-label="Vulnerability categories examples and key distinctions" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Category</th>
        <th scope="col">Examples</th>
        <th scope="col">Key distinction</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Application</strong></td>
        <td>Memory injection, buffer overflow, race condition, malicious update</td>
        <td>The weakness exists in program logic, memory handling, execution flow, or update behavior</td>
      </tr>
      <tr>
        <td><strong>Web-based</strong></td>
        <td>SQL injection and cross-site scripting</td>
        <td>Untrusted input reaches a database command or browser output without safe handling</td>
      </tr>
      <tr>
        <td><strong>Hardware and firmware</strong></td>
        <td>Vulnerable firmware, end-of-life equipment, legacy components</td>
        <td>The affected layer may be difficult to patch or may require replacement</td>
      </tr>
      <tr>
        <td><strong>Virtualization</strong></td>
        <td>VM escape and resource reuse</td>
        <td>Isolation between guests, hosts, or previous tenants fails</td>
      </tr>
      <tr>
        <td><strong>Cloud-specific</strong></td>
        <td>Public storage, excessive permissions, exposed keys, insecure service configuration</td>
        <td>Responsibility is shared, and configuration can expose resources quickly</td>
      </tr>
      <tr>
        <td><strong>Supply chain</strong></td>
        <td>Compromised service, hardware, software, library, or update provider</td>
        <td>Trust in an upstream provider carries the weakness downstream</td>
      </tr>
      <tr>
        <td><strong>Mobile device</strong></td>
        <td>Sideloading and jailbreaking</td>
        <td>Normal application controls or platform protections are bypassed</td>
      </tr>
      <tr>
        <td><strong>Misconfiguration</strong></td>
        <td>Default passwords, public access, excessive permissions, disabled logging</td>
        <td>The product may be secureable, but the deployed settings create exposure</td>
      </tr>
    </tbody>
  </table>
</div>

Operating-system and cryptographic vulnerabilities can cut across several of these categories. An outdated OS may expose a local privilege-escalation flaw. Weak algorithms, poor randomness, reused nonces, exposed keys, or incorrect certificate validation can weaken cryptographic protection.

In virtualized or shared environments, **resource reuse** can expose data left behind in memory, storage, snapshots, or another reassigned resource. Sanitization, secure deletion, isolation, encryption, and careful lifecycle controls reduce the chance that a later tenant or workload can recover residual data.

<h3>Memory injection and buffer overflow</h3>

**Memory injection** places malicious code or data into a process's memory so it can run within that process or change its behavior. **Buffer overflow** writes beyond an allocated memory boundary, potentially corrupting data, crashing the program, or redirecting execution.

Input validation, memory-safe development practices, compiler protections, address-space randomization, data execution prevention, patching, and application isolation can reduce exposure. The best answer depends on whether the question asks for a coding fix, a platform defense, or an immediate operational mitigation.

<h3>Race conditions and TOC/TOU</h3>

A race condition occurs when the result depends on timing or the order of operations. A time-of-check/time-of-use problem appears when a system verifies a condition, then uses the resource after that condition may have changed.

For example, an application checks that a file is safe and permitted. An attacker replaces or redirects the file before the application opens it. Atomic operations, locking, secure temporary-file handling, and designs that reduce the gap between checking and use help address the weakness.

<h3>SQL injection and cross-site scripting</h3>

**SQL injection** occurs when untrusted input changes the meaning of a database query. Parameterized queries, safe APIs, input handling, least-privileged database accounts, and defensive monitoring reduce risk.

**Cross-site scripting (XSS)** allows untrusted content to execute in another user's browser under the affected site's context. Context-aware output encoding, safe templating, input handling, content security policy, and secure cookie settings help limit exposure and impact.

The location of execution separates the two. SQL injection targets the application's database interaction. XSS targets browser-rendered content and the user's session.

<h3>Malicious updates and supply-chain flaws</h3>

A malicious update may be inserted by compromising a vendor, build system, signing process, distribution service, administrator account, or dependency. The file can arrive through an expected channel and still be harmful.

Code signing, reproducible builds, protected build pipelines, dependency review, staged rollout, behavior monitoring, and the ability to revoke trust all help. A valid signature confirms that a signing key approved the file. Defenders must also protect that key and the process using it.

<h3>Zero-day vulnerabilities</h3>

A zero-day vulnerability is unknown to the responsible vendor or lacks an available fix when attackers can exploit it. Defenders rely on layered controls such as isolation, least privilege, behavior monitoring, exploit protection, application control, segmentation, and temporary configuration changes until a patch or replacement becomes available.

<h2 id="malicious-activity">Malicious activity and indicators</h2>

Objective 2.4 asks you to analyze indicators. Begin with the evidence, then choose the attack that explains it with the fewest unsupported assumptions.

<h3>Malware behavior</h3>

<div class="table-scroll" role="region" aria-label="Malware types behaviors and common clues" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Malware</th>
        <th scope="col">Behavior</th>
        <th scope="col">Common clue</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Ransomware</strong></td>
        <td>Encrypts or disrupts systems and demands payment; may also steal data</td>
        <td>Inaccessible files, ransom note, unusual encryption activity</td>
      </tr>
      <tr>
        <td><strong>Trojan</strong></td>
        <td>Appears legitimate or useful while delivering hidden malicious behavior</td>
        <td>User-installed program followed by unexpected access or payload execution</td>
      </tr>
      <tr>
        <td><strong>Worm</strong></td>
        <td>Self-propagates across systems or networks</td>
        <td>Rapid spread without each user launching a copy</td>
      </tr>
      <tr>
        <td><strong>Spyware</strong></td>
        <td>Collects activity, communications, credentials, or other information</td>
        <td>Unexpected monitoring, outbound connections, or privacy loss</td>
      </tr>
      <tr>
        <td><strong>Bloatware</strong></td>
        <td>Adds unnecessary software that consumes resources or expands attack surface</td>
        <td>Preinstalled or bundled applications with little business value</td>
      </tr>
      <tr>
        <td><strong>Virus</strong></td>
        <td>Attaches to a host file or program and spreads when that host runs</td>
        <td>Modified files and execution-dependent propagation</td>
      </tr>
      <tr>
        <td><strong>Keylogger</strong></td>
        <td>Records keystrokes to capture credentials or sensitive information</td>
        <td>Stolen input despite otherwise normal application behavior</td>
      </tr>
      <tr>
        <td><strong>Logic bomb</strong></td>
        <td>Triggers when a defined condition or time occurs</td>
        <td>Delayed action tied to a date, account state, or event</td>
      </tr>
      <tr>
        <td><strong>Rootkit</strong></td>
        <td>Hides malicious activity and maintains privileged persistence</td>
        <td>System-level manipulation, hidden processes, altered security tools</td>
      </tr>
    </tbody>
  </table>
</div>

Malware labels can overlap. A Trojan may install spyware or a rootkit. Ransomware may arrive through phishing and then spread like a worm. Select the term tied to the behavior emphasized in the question.

<h3>Physical, network, application, and cryptographic attacks</h3>

- **Physical brute force:** Forcing a door, lock, enclosure, or other physical barrier. Context separates this from password brute force.
- **RFID cloning:** Copying identifier data from a badge or tag to impersonate the original device.
- **Environmental attack:** Using heat, water, smoke, power loss, or another environmental condition to damage or interrupt systems.
- **Distributed denial-of-service:** Many sources overwhelm a target. Reflected attacks send replies toward the victim using a spoofed source; amplified attacks produce responses larger than the original requests.
- **DNS attack:** Manipulating, poisoning, redirecting, tunneling through, or exhausting DNS services.
- **Wireless attack:** Rogue access points, evil twins, deauthentication, weak encryption, or unauthorized association.
- **On-path attack:** Intercepting and possibly altering communications between parties.
- **Credential replay:** Reusing captured authentication material or a valid session artifact.
- **Injection:** Supplying input that becomes part of a command, query, or interpreted instruction.
- **Replay:** Resending a previously valid transmission to repeat an action or authentication.
- **Privilege escalation:** Gaining permissions beyond those originally assigned.
- **Forgery:** Creating a false token, request, message, signature, or identity representation.
- **Directory traversal:** Using path manipulation to reach files outside the intended directory.
- **Downgrade attack:** Forcing weaker protocol, algorithm, or security settings.
- **Collision attack:** Finding different inputs that produce the same hash output.
- **Birthday attack:** Exploiting collision probability to find a matching hash more efficiently than testing one exact preimage.

<h3>Password spraying and brute force</h3>

A **brute-force password attack** tries many candidate passwords against a target account or protected value. **Password spraying** tries a small number of common passwords across many accounts, often to avoid repeated failures on one account.

The logs may reveal the difference. Many failures against one user suggest focused guessing. One or two failures across a wide account list suggest spraying. Distributed sources can blur the picture, so consider timing, account patterns, lockouts, and successful follow-on access.

<h3>Indicators to recognize</h3>

<div class="table-scroll" role="region" aria-label="Security indicators and possible explanations" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Indicator</th>
        <th scope="col">What it may suggest</th>
        <th scope="col">What to verify</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Account lockout</strong></td>
        <td>Repeated failed authentication, password guessing, or a stale automated credential</td>
        <td>Targeted accounts, source addresses, timing, and recent password changes</td>
      </tr>
      <tr>
        <td><strong>Concurrent sessions</strong></td>
        <td>Credential sharing, stolen credentials, or a legitimate multi-device session</td>
        <td>Locations, device identity, session tokens, and normal user behavior</td>
      </tr>
      <tr>
        <td><strong>Impossible travel</strong></td>
        <td>Sign-ins from locations that cannot reasonably be reached in the elapsed time</td>
        <td>VPN use, proxy services, device history, and authentication strength</td>
      </tr>
      <tr>
        <td><strong>Resource consumption</strong></td>
        <td>Denial-of-service, cryptomining, runaway process, malware, or legitimate demand</td>
        <td>Process owner, traffic pattern, time of onset, and affected systems</td>
      </tr>
      <tr>
        <td><strong>Missing or out-of-cycle logs</strong></td>
        <td>Log tampering, disabled collection, system failure, or an unplanned process</td>
        <td>Collector health, time synchronization, retention, permissions, and alternate sources</td>
      </tr>
      <tr>
        <td><strong>Blocked content</strong></td>
        <td>A control intercepted malicious, prohibited, or misclassified traffic</td>
        <td>Rule matched, source, destination, payload, and false-positive history</td>
      </tr>
      <tr>
        <td><strong>Resource inaccessibility</strong></td>
        <td>Ransomware, outage, denial-of-service, permission change, or storage failure</td>
        <td>Error details, system health, recent changes, and access from other locations</td>
      </tr>
    </tbody>
  </table>
</div>

Published or documented indicators can include known malicious domains, file hashes, IP addresses, certificates, tactics, or patterns. They help detection, but context and freshness matter. Attackers can replace infrastructure quickly, and benign systems can sometimes reuse an address or service previously associated with abuse.

<h2 id="mitigations">Mitigation techniques</h2>

A mitigation reduces likelihood, exposure, or impact. Choose the control that addresses the weakness described in the scenario rather than the control with the broadest reputation.

<div class="table-scroll" role="region" aria-label="Mitigation techniques purposes and examples" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Mitigation</th>
        <th scope="col">Primary purpose</th>
        <th scope="col">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Segmentation</strong></td>
        <td>Limits reachability and lateral movement between systems or trust zones</td>
        <td>Separating user devices, servers, management systems, and industrial equipment</td>
      </tr>
      <tr>
        <td><strong>Access control</strong></td>
        <td>Restricts actions through identities, permissions, ACLs, and policy</td>
        <td>Allowing a service account to read one queue while denying administrative changes</td>
      </tr>
      <tr>
        <td><strong>Application allow list</strong></td>
        <td>Permits approved executables, scripts, or code and blocks unapproved items</td>
        <td>Allowing signed business applications on a kiosk</td>
      </tr>
      <tr>
        <td><strong>Isolation</strong></td>
        <td>Separates a risky or compromised system from normal communication</td>
        <td>Quarantining an endpoint after ransomware behavior is detected</td>
      </tr>
      <tr>
        <td><strong>Patching</strong></td>
        <td>Corrects known software or firmware flaws</td>
        <td>Prioritizing an internet-facing vulnerability with active exploitation</td>
      </tr>
      <tr>
        <td><strong>Encryption</strong></td>
        <td>Protects confidentiality of data at rest or in transit</td>
        <td>Encrypting a lost laptop's storage and administrative network sessions</td>
      </tr>
      <tr>
        <td><strong>Monitoring</strong></td>
        <td>Detects suspicious activity and supplies evidence for response</td>
        <td>Alerting on impossible travel, new persistence, or unusual data transfer</td>
      </tr>
      <tr>
        <td><strong>Least privilege</strong></td>
        <td>Limits each identity or process to the permissions required for its task</td>
        <td>Removing local administrator rights from ordinary user accounts</td>
      </tr>
      <tr>
        <td><strong>Configuration enforcement</strong></td>
        <td>Maintains approved settings and corrects drift</td>
        <td>Reapplying a secure baseline when a firewall or logging setting changes</td>
      </tr>
      <tr>
        <td><strong>Decommissioning</strong></td>
        <td>Removes unsupported or unnecessary assets and their exposure</td>
        <td>Retiring an obsolete server after migrating its required function</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>Hardening techniques</h3>

Hardening reduces unnecessary capability and applies secure defaults. Common actions include:

- Enabling appropriate encryption
- Installing endpoint protection
- Enabling a host-based firewall
- Deploying a host-based intrusion prevention system
- Disabling unused ports and protocols
- Changing default passwords
- Removing unnecessary software

Hardening should follow an approved baseline and include testing. Disabling a service blindly can create an outage; leaving every service enabled creates unnecessary exposure. The secure choice supports the required function with the smallest reasonable attack surface.

<h3>Choosing among similar mitigations</h3>

- Use **patching** when a supported fix corrects the vulnerable code.
- Use **configuration enforcement** when the product is secureable but settings have drifted or were deployed incorrectly.
- Use **isolation** when communication must stop quickly or a system cannot yet be remediated.
- Use **segmentation** to limit routine reachability and contain future movement between zones.
- Use **application allow listing** when only approved code should run.
- Use **least privilege** to reduce what a compromised account or process can do.
- Use **decommissioning** when the asset no longer justifies its risk or cannot be supported safely.

Patching is a process rather than a single click. Identify the affected assets, prioritize risk, acquire and test the update, deploy it, verify installation, and monitor for problems. Active exploitation, public exposure, business importance, and available compensating controls all affect priority.

<div class="article-callout">
  <p><strong>Exam clue:</strong> The strongest answer usually addresses the stated vulnerability or attack path directly. A generic security improvement may be helpful and still lose to the control that closes the actual opening.</p>
</div>

<h2 id="exam-traps">Common Domain 2 exam traps</h2>

<h3>Choosing the actor from the attack name</h3>

Ransomware suggests financial gain, yet the same technique could support disruption, espionage, or destruction. Use target selection, requested outcome, resources, and campaign behavior.

<h3>Confusing vector, vulnerability, and payload</h3>

A phishing email is a vector. A vulnerable macro or browser may provide the weakness. The installed remote-access Trojan is the payload. Questions often include all three and ask for only one.

<h3>Calling every deceptive message phishing</h3>

Email points toward phishing. SMS points toward smishing. A voice call points toward vishing. Pretexting describes the invented story, and impersonation describes the assumed identity. More than one label may apply, so match the wording of the question.

<h3>Mixing password spraying with brute force</h3>

Spraying distributes a few likely passwords across many accounts. Focused brute force tries many candidates against one account or protected value. Account and timing patterns provide the clue.

<h3>Assuming a valid update channel guarantees safe code</h3>

Supply-chain compromise can abuse a trusted vendor, build process, signing key, or distribution service. Verify integrity, provenance, behavior, and the security of the process behind the signature.

<h3>Picking encryption for an integrity or availability problem</h3>

Encryption protects confidentiality. It may support other goals as part of a larger protocol, but it does not restore an unavailable service or prove that every file is unmodified.

<h3>Using monitoring as the only mitigation</h3>

Monitoring helps detect and investigate. When the question asks how to prevent execution, close a port, remove excessive access, or correct vulnerable code, choose the control that changes the exposure.

<h2 id="review-checklist">Domain 2 review checklist</h2>

Before moving on, check whether you can do the following without relying on answer choices:

- Compare nation-state, unskilled, hacktivist, insider, organized-crime, and shadow-IT threats.
- Use actor location, funding, capability, target, and motivation together.
- Separate a threat vector from an attack surface, vulnerability, payload, and indicator.
- Recognize phishing, vishing, smishing, business email compromise, pretexting, watering holes, brand impersonation, and typosquatting.
- Explain how unsupported systems, open ports, default credentials, unsecure networks, and supply-chain dependencies expand exposure.
- Compare memory injection, buffer overflow, race conditions, SQL injection, XSS, VM escape, misconfiguration, sideloading, jailbreaking, and zero-day flaws.
- Distinguish ransomware, Trojans, worms, spyware, viruses, keyloggers, logic bombs, and rootkits by behavior.
- Recognize DDoS reflection and amplification, on-path attacks, credential replay, directory traversal, privilege escalation, and cryptographic downgrade or collision attacks.
- Separate password spraying from focused brute force.
- Interpret account lockouts, concurrent sessions, impossible travel, resource consumption, inaccessible resources, and missing logs in context.
- Match segmentation, access control, allow listing, isolation, patching, encryption, monitoring, least privilege, configuration enforcement, decommissioning, and hardening to their purposes.
- Explain why the selected mitigation addresses the stated weakness more directly than the alternatives.

<div class="article-callout article-callout--action">
  <p><strong>Apply the chain from actor to mitigation.</strong> Start a <a href="/security-plus/sy0-701/practice-test/">randomized SY0-701 practice test</a>, then review which clue identified the attack path or the most direct control.</p>
</div>

<h2 id="official-references">Official references</h2>

This guide follows the Threats, Vulnerabilities, and Mitigations topics listed in the official SY0-701 objectives. Use the current objectives as the final exam checklist.

- [CompTIA Security+ certification page](https://www.comptia.org/en-us/certifications/security/)
- [CompTIA Security+ SY0-701 exam objectives PDF](https://www.comptia.jp/pdf/CompTIA%20Security%2B%20SY0-701%20Exam%20Objectives.pdf)
- [CISA guidance for recognizing and reporting phishing](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing)
- [OWASP Top Ten web application security risks](https://owasp.org/www-project-top-ten/)
- [NIST SP 800-40 Rev. 4: Guide to Enterprise Patch Management Planning](https://csrc.nist.gov/pubs/sp/800/40/r4/final)
- [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

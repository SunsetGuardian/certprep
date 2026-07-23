---
layout: layouts/article.njk
title: "Security+ SY0-701 Domain 3: Security Architecture"
description: Study Security+ SY0-701 Domain 3 with practical comparisons of cloud models, secure infrastructure, data protection, resilience, backups, and recovery.
permalink: /security-plus/sy0-701/study-guide/security-architecture/
ogType: article
printable: true
printTitle: "Security+ SY0-701 Domain 3: Security Architecture"
author: certHappens
datePublished: 2026-07-23
articleSection: Security+ SY0-701 Domain 3
eyebrow: Security+ Domain 3 guide
lede: Connect architecture choices to security, availability, recovery, and the business constraints that shape a defensible design.
breadcrumbs:
  - label: Home
    url: /
  - label: Security+
    url: /security-plus/
  - label: SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
  - label: Security Architecture
    url: /security-plus/sy0-701/study-guide/security-architecture/
toc:
  - id: domain-map
    label: Domain 3 map
  - id: architecture-models
    label: Architecture models
  - id: enterprise-infrastructure
    label: Secure enterprise infrastructure
  - id: data-protection
    label: Data protection
  - id: resilience-recovery
    label: Resilience and recovery
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CompTIA Security+
  - SY0-701 Domain 3
  - security architecture
  - cloud security
  - network segmentation
  - data protection
  - disaster recovery
  - business continuity
relatedLinks:
  - title: Security+ SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
    description: Return to the full exam roadmap, domain priorities, and study plan.
  - title: "Domain 2: Threats, Vulnerabilities, and Mitigations"
    url: /security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/
    description: Review attack paths, weaknesses, indicators, and the controls that reduce risk.
  - title: Take a randomized SY0-701 practice test
    url: /security-plus/sy0-701/practice-test/
    description: Apply architecture and recovery concepts in 10, 20, 30, or 50-question sessions.
---
Domain 3 accounts for 18 percent of the SY0-701 exam. Its questions usually begin with a design choice: where a system runs, how traffic reaches it, what data it handles, or how the organization plans to continue after a failure.

Security architecture is built around tradeoffs. A control may improve isolation while adding latency. A highly available service may cost more and expose more components. A legacy industrial system may be essential to production even when it cannot accept ordinary patches. Read the requirement first, then judge the design.

<h2 id="domain-map">Domain 3 map</h2>

The official objectives divide Security Architecture into four areas:

<div class="table-scroll" role="region" aria-label="Security+ SY0-701 Domain 3 objective map" tabindex="0">
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
        <td>3.1</td>
        <td>Architecture models</td>
        <td>Where does responsibility sit, what assumptions change, and which tradeoffs follow from the model?</td>
      </tr>
      <tr>
        <td>3.2</td>
        <td>Enterprise infrastructure</td>
        <td>Where should controls be placed, which connections are allowed, and how should failure be handled?</td>
      </tr>
      <tr>
        <td>3.3</td>
        <td>Data protection</td>
        <td>What data is being protected, where is it, and which method addresses the required security property?</td>
      </tr>
      <tr>
        <td>3.4</td>
        <td>Resilience and recovery</td>
        <td>How much disruption and data loss can the business accept, and which design can meet those limits?</td>
      </tr>
    </tbody>
  </table>
</div>

Architecture questions become easier when you identify the asset, trust boundary, required outcome, and operating constraint. Those four details often eliminate answers that sound secure in the abstract but do not fit the environment.

<h2 id="architecture-models">Architecture models and their security implications</h2>

An architecture model changes who operates each layer, where controls can be placed, and which failures the organization must prepare to handle. Moving a workload does not remove responsibility. It redistributes it.

<h3>Cloud deployment and service models</h3>

Cloud deployment models describe who uses the environment and how it is made available:

<div class="table-scroll" role="region" aria-label="Cloud deployment models and security considerations" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Model</th>
        <th scope="col">Typical use</th>
        <th scope="col">Security considerations</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Public cloud</td>
        <td>Services are offered from a provider's shared infrastructure to many customers.</td>
        <td>Tenant isolation, provider dependency, identity configuration, exposed services, data location, and contractual controls.</td>
      </tr>
      <tr>
        <td>Private cloud</td>
        <td>Cloud capabilities are dedicated to one organization.</td>
        <td>Greater control can bring greater operational responsibility, including staffing, patching, capacity, and recovery.</td>
      </tr>
      <tr>
        <td>Hybrid cloud</td>
        <td>Private or on-premises resources are connected with public cloud services.</td>
        <td>Consistent identity, encryption, logging, data movement, network paths, and policy across environments.</td>
      </tr>
      <tr>
        <td>Community cloud</td>
        <td>Organizations with shared requirements use a common environment.</td>
        <td>Governance, participant boundaries, shared standards, and agreement on responsibility.</td>
      </tr>
    </tbody>
  </table>
</div>

Cloud service models describe how much of the technology stack the provider operates:

<div class="table-scroll" role="region" aria-label="Cloud service models and customer responsibilities" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Service model</th>
        <th scope="col">Provider typically manages</th>
        <th scope="col">Customer still manages</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>IaaS</td>
        <td>Facilities, physical hardware, core networking, storage, and the virtualization layer.</td>
        <td>Guest operating systems, applications, identities, workload configuration, and data.</td>
      </tr>
      <tr>
        <td>PaaS</td>
        <td>Infrastructure plus the managed runtime, platform components, and much of the operating environment.</td>
        <td>Application code, identities, secrets, data, and service configuration.</td>
      </tr>
      <tr>
        <td>SaaS</td>
        <td>The application and the underlying platform and infrastructure.</td>
        <td>Accounts, roles, data handling, tenant settings, integrations, endpoints, and acceptable use.</td>
      </tr>
    </tbody>
  </table>
</div>

A responsibility matrix should identify which party owns each control and task. The provider may secure the physical host while the customer remains responsible for an overly broad administrator role or a public storage container. Outsourcing the service does not outsource the need to verify the agreement and configuration.

<h3>Hybrid environments and third-party services</h3>

Hybrid designs introduce boundaries between environments with different tools, administrators, logging formats, and failure modes. Review:

- Identity federation and account lifecycle across systems
- Encryption and key ownership as data moves
- Routing, filtering, and inspection between locations
- Centralized logging and time synchronization
- Backup and recovery responsibilities
- Provider outages and loss of network connectivity
- Contractual requirements for notification, retention, deletion, and audit evidence

A third party can transfer some operational work and some financial risk. Accountability for protecting the organization's mission and data remains with the organization. The exam may describe a provider control and ask which customer-side responsibility is still missing.

<h3>Infrastructure as code, serverless, microservices, and software-defined networking</h3>

Modern architecture often moves configuration into code and divides systems into smaller managed components.

- **Infrastructure as code (IaC)** defines infrastructure through versioned templates or scripts. It supports repeatable deployment and review. A mistake in the template can also spread quickly, so protect repositories, approve changes, scan templates, and detect configuration drift.
- **Serverless computing** runs functions or services without requiring the customer to administer the underlying servers. Secure the code, triggers, identities, secrets, dependencies, data flows, and service configuration.
- **Microservices** divide an application into smaller services that communicate through APIs or messaging. Each service identity, interface, dependency, and network path becomes part of the attack surface.
- **Software-defined networking (SDN)** separates centralized control decisions from traffic forwarding. Protect controllers, administrative interfaces, policy changes, and communication between the control and data planes.

Automation improves consistency when the source configuration is trustworthy. It also makes a bad setting remarkably efficient. Review and testing belong before broad deployment.

<h3>Centralized and decentralized architectures</h3>

Centralization can simplify policy, visibility, identity, and administration. It can also create a high-value target or single point of failure. Decentralization may improve local autonomy and reduce dependency on one component, while making consistent control and monitoring harder.

<div class="table-scroll" role="region" aria-label="Centralized and decentralized architecture tradeoffs" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Approach</th>
        <th scope="col">Potential strengths</th>
        <th scope="col">Potential concerns</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Centralized</td>
        <td>Consistent policy, consolidated logs, simpler administration, and clear control points.</td>
        <td>Concentrated privilege, attractive targets, dependency on central services, and wider impact from failure.</td>
      </tr>
      <tr>
        <td>Decentralized</td>
        <td>Local resilience, autonomy, reduced dependency on one controller, and distribution of workload.</td>
        <td>Policy drift, fragmented visibility, uneven patching, duplicated effort, and difficult coordination.</td>
      </tr>
    </tbody>
  </table>
</div>

The exam is unlikely to reward a blanket preference. Match the model to the stated requirement and account for its failure modes.

<h3>Virtualization and containers</h3>

A virtual machine includes a guest operating system and runs through a hypervisor. Containers commonly share the host operating system kernel while isolating applications and their dependencies.

<div class="table-scroll" role="region" aria-label="Virtual machines and containers security comparison" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Technology</th>
        <th scope="col">Isolation boundary</th>
        <th scope="col">Security focus</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Virtual machine</td>
        <td>Guest operating system separated through a hypervisor.</td>
        <td>Hypervisor security, guest patching, image control, management interfaces, virtual networking, and VM escape risk.</td>
      </tr>
      <tr>
        <td>Container</td>
        <td>Application processes isolated while commonly sharing the host kernel.</td>
        <td>Trusted images, minimal privileges, runtime policy, secrets, orchestration security, registry protection, and host-kernel exposure.</td>
      </tr>
    </tbody>
  </table>
</div>

Snapshots and reusable images accelerate deployment. They can also preserve vulnerable software, embedded secrets, or insecure defaults. Build from approved images, scan them, sign or verify trusted artifacts, and remove unnecessary packages and privileges.

<h3>IoT, embedded, real-time, and operational technology</h3>

Specialized systems often prioritize safety, reliability, timing, power use, or long service life. Standard enterprise assumptions may not apply.

- **Internet of Things (IoT)** devices include connected sensors, cameras, appliances, controllers, and other purpose-built devices. Common concerns include default credentials, weak update mechanisms, exposed management services, and poor inventory visibility.
- **Embedded systems** perform dedicated functions inside larger products or equipment. They may have limited storage, processing power, and security features.
- **Real-time operating systems (RTOS)** must complete tasks within defined timing constraints. Security controls that introduce unpredictable delay may interfere with the required function.
- **Operational technology (OT)** monitors or changes physical processes. Industrial control systems and SCADA environments may include controllers, sensors, actuators, engineering workstations, and human-machine interfaces.

Safety and availability can dominate OT decisions. A restart that is routine on an office workstation may interrupt production or create a physical hazard on a control system. Use segmentation, tightly controlled remote access, asset inventory, passive monitoring where appropriate, tested maintenance windows, and compensating controls for systems that cannot be patched promptly.

<div class="article-callout">
  <p><strong>Exam clue:</strong> When a specialized system cannot support the preferred control, choose a control that respects its operating limits while reducing exposure. Isolation and strict access may be more realistic than forcing an incompatible agent onto the device.</p>
</div>

<h3>Architecture tradeoffs</h3>

Architecture questions often include one or more constraints. Translate each constraint into a design concern:

<div class="table-scroll" role="region" aria-label="Architecture constraints and design implications" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Constraint</th>
        <th scope="col">What to evaluate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Availability</td>
        <td>Redundancy, failover, maintenance impact, dependencies, and recovery time.</td>
      </tr>
      <tr>
        <td>Resilience</td>
        <td>Ability to absorb failure, continue essential functions, and restore normal service.</td>
      </tr>
      <tr>
        <td>Cost</td>
        <td>Capital expense, operating expense, staffing, licensing, data transfer, and duplicated capacity.</td>
      </tr>
      <tr>
        <td>Responsiveness</td>
        <td>Latency, processing delay, geographic distance, and control overhead.</td>
      </tr>
      <tr>
        <td>Scalability</td>
        <td>Ability to add capacity without redesigning the entire service or weakening controls.</td>
      </tr>
      <tr>
        <td>Ease of deployment</td>
        <td>Automation, standard images, repeatable configuration, and change approval.</td>
      </tr>
      <tr>
        <td>Risk transference</td>
        <td>Which duties move to a provider or insurer, which remain internal, and whether the contract is adequate.</td>
      </tr>
      <tr>
        <td>Ease of recovery</td>
        <td>Backup compatibility, documented procedures, replacement resources, and tested restoration.</td>
      </tr>
      <tr>
        <td>Patch availability</td>
        <td>Vendor support, maintenance windows, validation, rollback, and compensating controls.</td>
      </tr>
      <tr>
        <td>Power and compute</td>
        <td>Device capacity, battery life, heat, timing, and the resource cost of security controls.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="enterprise-infrastructure">Applying security principles to enterprise infrastructure</h2>

Secure infrastructure begins with placement and allowed communication. Put systems into zones based on trust, function, and data sensitivity. Then permit only the traffic required between those zones.

<h3>Security zones and device placement</h3>

Common zones include:

- **Internet or untrusted zone:** External networks with no assumed trust.
- **Screened subnet or DMZ:** Public-facing services separated from internal systems.
- **Internal user zone:** Workstations and ordinary business services.
- **Server or application zone:** Internal services with narrower access requirements.
- **Management zone:** Administrative interfaces and tools restricted to authorized administrators and management paths.
- **Guest zone:** Visitor or unmanaged-device access separated from business resources.
- **Restricted data zone:** Systems handling regulated, sensitive, or mission-critical data.
- **OT zone:** Industrial or physical-process systems isolated from ordinary enterprise traffic.

Segmentation limits routine reachability and reduces lateral movement. Isolation removes communication more completely. An air gap uses physical separation, although removable media, maintenance connections, and human processes can still move data across the boundary.

<h3>Infrastructure controls and their placement</h3>

<div class="table-scroll" role="region" aria-label="Enterprise infrastructure controls and placement" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Control</th>
        <th scope="col">Primary purpose</th>
        <th scope="col">Typical placement or use</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Firewall</td>
        <td>Allows or blocks network traffic according to policy and connection context.</td>
        <td>Between trust zones, at network boundaries, or on individual hosts.</td>
      </tr>
      <tr>
        <td>Web application firewall</td>
        <td>Inspects HTTP and HTTPS traffic for web-application attacks and policy violations.</td>
        <td>In front of public or sensitive web applications.</td>
      </tr>
      <tr>
        <td>IDS or IPS</td>
        <td>Detects suspicious activity; an IPS can also block or disrupt matching traffic.</td>
        <td>At important network boundaries or near critical assets, with visibility into relevant traffic.</td>
      </tr>
      <tr>
        <td>Proxy</td>
        <td>Mediates requests, applies policy, filters content, and can hide internal clients or servers.</td>
        <td>Forward proxy for outbound client access; reverse proxy in front of services.</td>
      </tr>
      <tr>
        <td>VPN gateway</td>
        <td>Creates an encrypted tunnel for site-to-site or remote access.</td>
        <td>At the network edge or cloud boundary, followed by authentication and authorization controls.</td>
      </tr>
      <tr>
        <td>Load balancer</td>
        <td>Distributes requests across service instances and can perform health checks.</td>
        <td>In front of a server pool or application tier.</td>
      </tr>
      <tr>
        <td>Jump server</td>
        <td>Provides a controlled administrative path into restricted systems.</td>
        <td>Between administrator access and management interfaces, with strong authentication and logging.</td>
      </tr>
      <tr>
        <td>Network sensor</td>
        <td>Collects traffic or telemetry for monitoring and analysis.</td>
        <td>Where it can observe the desired segment, boundary, or mirrored traffic.</td>
      </tr>
    </tbody>
  </table>
</div>

Placement determines usefulness. A sensor cannot analyze traffic it never sees. A WAF protects web requests, while a network firewall handles broader traffic policy. A jump server narrows administrative entry, but it must be hardened because its access makes it valuable.

<h3>Firewall types and traffic decisions</h3>

- **Packet filtering** evaluates fields such as source, destination, protocol, and port.
- **Stateful inspection** tracks connection state and permits return traffic associated with an approved session.
- **Next-generation firewalls** can add application awareness, user context, intrusion prevention, threat intelligence, and deeper inspection.
- **Web application firewalls** focus on application-layer web traffic.
- **Host-based firewalls** enforce policy directly on an endpoint or server.

Select the control that sees the information needed for the decision. A port-based rule cannot distinguish two applications using the same encrypted channel. A WAF will not replace segmentation between database and management networks.

<h3>Connectivity, attack surface, and secure access</h3>

Every enabled service, administrative interface, wireless connection, remote-access path, and third-party link expands the attack surface. Reduce that surface through:

- Default-deny rules followed by explicit business allowances
- Separate management interfaces or management networks
- Strong authentication and least-privilege authorization
- Secure protocols such as SSH, TLS, and IPsec where appropriate
- Network access control and switch port controls
- Removal of unused services, routes, accounts, and interfaces
- Encryption for untrusted or shared networks
- Logging at boundaries and on high-value systems

Port security can limit which devices connect to a switch port. Network access control can evaluate identity or device posture before granting access. Neither control removes the need for segmentation and endpoint security after admission.

<h3>Failure modes</h3>

A security device can fail open or fail closed:

- **Fail open** preserves traffic flow when the control fails. Availability remains higher, while enforcement may be lost.
- **Fail closed** blocks traffic when the control fails. Security policy remains enforced, while availability may suffer.

The correct mode depends on the system. A payment service, emergency system, safety controller, and restricted management network may reach different decisions. Identify which outcome the scenario treats as less acceptable.

<h3>Example: a public three-tier application</h3>

A defensible design might place:

1. A reverse proxy or WAF in front of the public web tier.
2. Web servers in a screened subnet with no direct administrative access from the internet.
3. Application servers in an internal application zone reachable only from the web tier on required ports.
4. Database servers in a restricted data zone reachable only from the application tier.
5. Administrative access through a jump server on a separate management path.
6. Central logging, monitoring, vulnerability management, and protected backups across the design.

The exact products may vary. The important reasoning is the direction and purpose of each permitted connection.

<div class="article-callout">
  <p><strong>Exam clue:</strong> When a diagram question asks where to place a control, ask which traffic it must observe or block. Place the control on that path without granting it unnecessary access to unrelated zones.</p>
</div>

<h2 id="data-protection">Protecting data by type, state, and location</h2>

Data protection starts with knowing what the data is and how the organization uses it. A public brochure and a payroll file should not receive the same access rules, retention, monitoring, or recovery priority.

<h3>Data types and classifications</h3>

Common data types include regulated records, financial information, legal material, intellectual property, trade secrets, customer data, employee data, and operational records. Data may be human-readable, such as a document, or non-human-readable, such as an encoded database or machine format.

Classification labels vary by organization. The following pattern is common:

<div class="table-scroll" role="region" aria-label="Data classifications and protection expectations" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Classification</th>
        <th scope="col">Typical meaning</th>
        <th scope="col">Protection expectations</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Public</td>
        <td>Approved for release outside the organization.</td>
        <td>Integrity and availability still matter even when confidentiality is low.</td>
      </tr>
      <tr>
        <td>Private</td>
        <td>Personal or internal information intended for limited use.</td>
        <td>Access control, privacy handling, approved sharing, and retention rules.</td>
      </tr>
      <tr>
        <td>Confidential</td>
        <td>Business information whose disclosure could cause harm.</td>
        <td>Need-to-know access, encryption, monitoring, and controlled distribution.</td>
      </tr>
      <tr>
        <td>Restricted</td>
        <td>Highly sensitive information with strict access or legal requirements.</td>
        <td>Strong access controls, detailed logging, encryption, segmentation, and formal handling procedures.</td>
      </tr>
      <tr>
        <td>Critical</td>
        <td>Information required for essential operations or recovery.</td>
        <td>Integrity, availability, protected backups, tested recovery, and tight change control.</td>
      </tr>
    </tbody>
  </table>
</div>

The label alone does not choose every control. A critical public service may need strong integrity and availability with little confidentiality. A restricted research file may require strong confidentiality even when short downtime is tolerable.

<h3>Data states</h3>

- **Data at rest** is stored on disks, databases, backups, removable media, or other persistent storage.
- **Data in transit** is moving across a network or between systems.
- **Data in use** is being processed in memory or actively handled by an application or user.

Controls must match the state. Full-disk encryption protects a powered-off stolen drive. Transport encryption protects data moving across an untrusted network. Access control, process isolation, memory protections, and secure enclaves can help while data is in use.

<h3>Data sovereignty and geolocation</h3>

Data sovereignty concerns the laws and requirements that apply based on where data is stored or processed. Geolocation identifies where systems, users, or data reside. Cloud replication, backups, content delivery, and support access can move data across regions even when the application appears to run in one place.

Architecture decisions should verify:

- Approved countries or regions
- Provider replication and backup locations
- Cross-border transfer restrictions
- Administrative access from other locations
- Retention and deletion obligations
- Contractual evidence that the provider follows the required placement

A geographic restriction can support sovereignty requirements, latency, or disaster recovery. It should be enforced through service configuration and verified through provider documentation and monitoring.

<h3>Methods for protecting data</h3>

<div class="table-scroll" role="region" aria-label="Data protection methods and appropriate uses" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Method</th>
        <th scope="col">What it provides</th>
        <th scope="col">Appropriate use</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Encryption</td>
        <td>Transforms readable data into ciphertext using a key.</td>
        <td>Protecting confidentiality at rest or in transit, with key management that matches the design.</td>
      </tr>
      <tr>
        <td>Hashing</td>
        <td>Produces a fixed-length digest used to detect change or support verification.</td>
        <td>Integrity checks, password-verification schemes with salts and key stretching, and signed data workflows.</td>
      </tr>
      <tr>
        <td>Masking</td>
        <td>Hides part or all of a value from a viewer or lower-trust environment.</td>
        <td>Displaying only the last digits of an account number or preparing safer test data.</td>
      </tr>
      <tr>
        <td>Tokenization</td>
        <td>Replaces sensitive data with a surrogate token linked through a protected system.</td>
        <td>Reducing exposure of payment, identity, or other sensitive values in ordinary application flows.</td>
      </tr>
      <tr>
        <td>Obfuscation</td>
        <td>Makes data or code harder to understand.</td>
        <td>Discouraging casual inspection; it should not be treated as strong confidentiality by itself.</td>
      </tr>
      <tr>
        <td>Segmentation</td>
        <td>Limits which systems and users can reach the data environment.</td>
        <td>Separating regulated, restricted, or critical systems from general traffic.</td>
      </tr>
      <tr>
        <td>Permission restrictions</td>
        <td>Limits access and actions according to identity and role.</td>
        <td>Enforcing least privilege and need-to-know access.</td>
      </tr>
      <tr>
        <td>Geographic restrictions</td>
        <td>Limits storage, processing, or access to approved locations.</td>
        <td>Supporting sovereignty, contractual, latency, or risk requirements.</td>
      </tr>
    </tbody>
  </table>
</div>

Several methods can work together. Tokenized values may still travel over encrypted connections. A restricted database may also sit in a segmented zone with narrow permissions and monitored access.

<h3>Choosing the right method</h3>

Start with the required outcome:

- Need confidentiality if storage is stolen: use encryption at rest and protect the keys.
- Need confidentiality over an untrusted network: use authenticated transport encryption.
- Need to detect modification: use a suitable integrity mechanism such as a hash within a trusted verification process or a digital signature.
- Need realistic test data without exposing production values: use masking, tokenization, or synthetic data according to the use case.
- Need to limit who can reach a sensitive system: use segmentation and permission restrictions.
- Need to keep data inside an approved region: configure and verify geographic restrictions.

The method must cover the actual path. Encrypting a database does not protect a report after an authorized user exports it to an unmanaged device.

<h2 id="resilience-recovery">Resilience and recovery in security architecture</h2>

Resilience is the ability to continue essential functions, withstand disruption, and recover. Recovery design translates business impact into technical targets and tested procedures.

<h3>Availability, redundancy, and fault tolerance</h3>

These terms overlap but answer different questions:

<div class="table-scroll" role="region" aria-label="Availability and resilience concepts" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Concept</th>
        <th scope="col">Purpose</th>
        <th scope="col">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>High availability</td>
        <td>Reduces service interruption through redundant components and rapid failover.</td>
        <td>Multiple application instances across separate failure domains.</td>
      </tr>
      <tr>
        <td>Redundancy</td>
        <td>Provides additional components, paths, or copies.</td>
        <td>Dual network links, redundant power supplies, or multiple DNS servers.</td>
      </tr>
      <tr>
        <td>Fault tolerance</td>
        <td>Allows a service to continue operating despite a component failure.</td>
        <td>A storage array continuing after a drive failure.</td>
      </tr>
      <tr>
        <td>Load balancing</td>
        <td>Distributes work across available service instances.</td>
        <td>Requests sent among several healthy web servers.</td>
      </tr>
      <tr>
        <td>Clustering</td>
        <td>Coordinates systems to provide a shared service or failover capability.</td>
        <td>A database cluster moving service to another node after failure.</td>
      </tr>
    </tbody>
  </table>
</div>

Redundancy only helps when the redundant components do not share the same failure. Two servers on one power circuit and one switch may still fail together. Separate failure domains can include power, network, hardware, location, provider region, account, and administrative control.

<h3>Recovery measurements</h3>

<div class="table-scroll" role="region" aria-label="Recovery and reliability measurements" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Measurement</th>
        <th scope="col">Question it answers</th>
        <th scope="col">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>RTO</td>
        <td>How long may the service remain unavailable after disruption?</td>
        <td>An ordering system must return within four hours.</td>
      </tr>
      <tr>
        <td>RPO</td>
        <td>How much recent data can the organization afford to lose?</td>
        <td>A one-hour RPO requires recoverable data no more than one hour old.</td>
      </tr>
      <tr>
        <td>MTTR</td>
        <td>How long does repair or restoration usually take?</td>
        <td>A failed device is normally restored in 45 minutes.</td>
      </tr>
      <tr>
        <td>MTBF</td>
        <td>How long does a repairable component typically operate between failures?</td>
        <td>A device averages three years of operation between failures.</td>
      </tr>
    </tbody>
  </table>
</div>

RTO is a business recovery target. MTTR is an observed or estimated repair measure. A four-hour RTO may require an architecture that fails over in minutes even when replacement hardware takes a day to repair.

RPO drives backup or replication frequency. A daily backup cannot support a one-hour RPO by itself.

<h3>Recovery sites and geographic resilience</h3>

<div class="table-scroll" role="region" aria-label="Recovery site types and readiness" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Site type</th>
        <th scope="col">Readiness</th>
        <th scope="col">Tradeoff</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Hot site</td>
        <td>Equipped, connected, and maintained for rapid activation, often with current or near-current data.</td>
        <td>Fast recovery with high ongoing cost and operational complexity.</td>
      </tr>
      <tr>
        <td>Warm site</td>
        <td>Has key infrastructure and connectivity but requires configuration, data restoration, or additional preparation.</td>
        <td>Moderate cost and recovery time.</td>
      </tr>
      <tr>
        <td>Cold site</td>
        <td>Provides space and basic facilities with little ready-to-run technology.</td>
        <td>Lower standing cost with slower recovery.</td>
      </tr>
    </tbody>
  </table>
</div>

Geographic dispersion protects against regional events. Distance should reduce shared risk from power, weather, telecommunications, or physical disruption while still meeting latency, sovereignty, staffing, and recovery requirements.

Platform diversity can reduce dependence on one operating system, technology stack, or failure mechanism. It also raises training, integration, and maintenance costs. Multi-cloud designs may reduce provider concentration, but they do not automatically provide failover. Applications, identities, data, networking, monitoring, and procedures must be designed and tested across providers.

<h3>Backups, snapshots, replication, and journaling</h3>

<div class="table-scroll" role="region" aria-label="Backup and data recovery methods" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Method</th>
        <th scope="col">Strength</th>
        <th scope="col">Important limitation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Backup</td>
        <td>Creates a recoverable copy according to a schedule and retention policy.</td>
        <td>Restore time, backup age, integrity, and access to the backup determine usefulness.</td>
      </tr>
      <tr>
        <td>Snapshot</td>
        <td>Captures a point-in-time state quickly, often within the same storage platform.</td>
        <td>It may share hardware, credentials, or failure domains with the source.</td>
      </tr>
      <tr>
        <td>Replication</td>
        <td>Copies data or service state to another system or location with low delay.</td>
        <td>Deletion, corruption, and ransomware can replicate too unless protected versions or recovery controls exist.</td>
      </tr>
      <tr>
        <td>Journaling</td>
        <td>Records changes or transactions that can support point-in-time recovery.</td>
        <td>Recovery still depends on a valid base copy, protected logs, and tested procedures.</td>
      </tr>
    </tbody>
  </table>
</div>

A sound backup design considers:

- On-site copies for speed and off-site copies for site loss
- Offline or logically isolated copies that ordinary production credentials cannot alter
- Frequency and retention based on RPO and business requirements
- Encryption in storage and transit
- Separate protection for encryption keys
- Integrity checks and monitoring for failed jobs
- Documented restoration steps
- Regular recovery tests using representative systems and data

A successful backup job proves that data was written somewhere. A successful restore test proves much more.

<h3>Continuity, capacity, and testing</h3>

Continuity of operations identifies essential functions, responsible people, alternate processes, communication paths, and the resources required during disruption.

Capacity planning should address:

- **People:** Trained staff, alternates, contact methods, and authority to act.
- **Technology:** Compute, storage, licenses, network capacity, replacement equipment, and recovery tooling.
- **Infrastructure:** Facilities, power, cooling, telecommunications, transportation, and physical access.

Plans should be tested at increasing levels of realism:

<div class="table-scroll" role="region" aria-label="Continuity and recovery test methods" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Test method</th>
        <th scope="col">How it works</th>
        <th scope="col">What it reveals</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Tabletop</td>
        <td>Participants discuss roles and decisions using a scenario.</td>
        <td>Missing contacts, unclear authority, procedure gaps, and conflicting assumptions.</td>
      </tr>
      <tr>
        <td>Simulation</td>
        <td>Teams perform selected actions in a controlled scenario without causing a full production outage.</td>
        <td>Operational coordination, tool access, timing, and procedural weaknesses.</td>
      </tr>
      <tr>
        <td>Failover test</td>
        <td>Service moves to an alternate component, site, or environment.</td>
        <td>Whether dependencies, data, routing, identity, and monitoring support actual transition.</td>
      </tr>
      <tr>
        <td>Parallel processing</td>
        <td>Primary and alternate systems operate together while results are compared.</td>
        <td>Whether the alternate environment can process real work correctly before cutover.</td>
      </tr>
    </tbody>
  </table>
</div>

Test plans should define scope, safety controls, success criteria, rollback, evidence, and follow-up work. A test that discovers a gap has done its job. The gap should become an assigned remediation item rather than a footnote that waits for the next emergency.

<h3>Power resilience</h3>

An uninterruptible power supply provides immediate short-duration power and helps bridge brief outages or the time required to start another source. A generator supports longer operation when fuel, maintenance, transfer equipment, and load capacity are adequate.

UPS capacity should cover the intended equipment and runtime. Generator plans should include fuel availability, testing, safe operation, and the systems that must remain powered, including cooling and network equipment. A powered server without cooling or connectivity is an expensive status light.

<div class="article-callout">
  <p><strong>Exam clue:</strong> Choose recovery controls from the stated RTO and RPO. Faster recovery and lower data loss usually require more current copies, more ready capacity, and more frequent testing.</p>
</div>

<h2 id="exam-traps">Common Domain 3 exam traps</h2>

<h3>Assuming the cloud provider secures every layer</h3>

Identify the service model and the misconfigured component. Customer identities, data, application settings, and tenant configuration frequently remain customer responsibilities.

<h3>Choosing a control without considering placement</h3>

A control must sit where it can observe or enforce the relevant traffic. Trace the path between the source and destination before selecting the device or zone.

<h3>Treating segmentation, isolation, and air gaps as synonyms</h3>

Segmentation permits controlled communication. Isolation removes or sharply restricts communication. An air gap uses physical separation. The scenario's required connectivity determines the right choice.

<h3>Using encryption for every data problem</h3>

Encryption addresses confidentiality. Integrity, availability, minimization, regional placement, and access limitation may require other controls.

<h3>Confusing a snapshot or replica with an independent backup</h3>

Snapshots and replicas may share credentials, platforms, or corruption with production. Check whether the copy survives the failure described in the question.

<h3>Mixing RTO and RPO</h3>

RTO measures acceptable downtime. RPO measures acceptable data loss. Look for time-to-service language versus age-of-recoverable-data language.

<h3>Calling redundant components resilient without checking shared failures</h3>

Redundancy inside one rack, building, region, account, or administrative domain may still fail together. Identify the failure the design must survive.

<h3>Ignoring safety and timing in specialized systems</h3>

OT, embedded, and real-time systems may not tolerate ordinary scanning, restarts, agents, or delayed processing. Choose controls that respect the physical process and operating limits.

<h2 id="review-checklist">Domain 3 review checklist</h2>

Before leaving Security Architecture, confirm that you can:

- Explain public, private, hybrid, and community cloud models.
- Separate customer and provider responsibilities across IaaS, PaaS, and SaaS.
- Describe the security effects of IaC, serverless computing, microservices, SDN, virtualization, and containers.
- Compare centralized and decentralized designs without assuming one is always stronger.
- Identify security constraints for IoT, embedded, real-time, and OT systems.
- Place firewalls, WAFs, IDS or IPS sensors, proxies, VPN gateways, load balancers, and jump servers on a diagram.
- Explain segmentation, isolation, air gaps, management networks, and security zones.
- Choose between fail-open and fail-closed behavior from the business requirement.
- Classify data and select controls for its type, state, and location.
- Compare encryption, hashing, masking, tokenization, obfuscation, permissions, and geographic restrictions.
- Distinguish high availability, redundancy, fault tolerance, load balancing, and clustering.
- Explain RTO, RPO, MTTR, and MTBF with examples.
- Compare hot, warm, and cold recovery sites.
- Separate backups, snapshots, replication, and journaling.
- Match tabletop, simulation, failover, and parallel tests to their purpose.
- Account for people, technology, infrastructure, power, and shared failure domains in a recovery design.

Use the [randomized SY0-701 practice test](/security-plus/sy0-701/practice-test/) to find which architecture comparisons still need another pass.

<h2 id="official-references">Official references</h2>

Domain coverage and weighting are based on CompTIA's published SY0-701 objectives. The supporting architecture and recovery references below come from NIST guidance.

- [CompTIA Security+ certification page](https://www.comptia.org/en-us/certifications/security/)
- [NIST SP 800-145, The NIST Definition of Cloud Computing](https://csrc.nist.gov/pubs/sp/800/145/final)
- [NIST SP 800-190, Application Container Security Guide](https://csrc.nist.gov/pubs/sp/800/190/final)
- [NIST SP 800-82 Rev. 3, Guide to Operational Technology Security](https://csrc.nist.gov/pubs/sp/800/82/r3/final)
- [NIST SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final)

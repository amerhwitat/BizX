# InternetScanner GUI & Security Explorer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the authorized-network InternetScanner into a cross-platform defensive network inventory application with a primary local web GUI, bounded TCP/UDP IPv4/IPv6 scanning, service identification, passive public metadata, NVD-backed vulnerability correlation, topology mapping, and validated import/export.

**Architecture:** A canonical TypeScript/Node.js engine owns the policy guard, scan controller, event bus, normalized schema, TCP/UDP engines, service evidence, vulnerability correlation, topology graph, and project import/export. The browser UI communicates only with that local controller; every active probe is authorized inside the engine rather than trusted to the UI. Existing Python, Java, C++, Rust, Go, Kotlin, Swift, Dart, PHP, Ruby, and TypeScript/Node reference implementations remain compatible adapters/contracts and consume the same normalized project schema.

**Tech Stack:** Node.js 22+, TypeScript, browser Web UI, native Node networking APIs, JSON Schema-style validation, CSV/XML serializers, optional local Nmap executable, NVD REST data/cache, deterministic unit/integration tests.

**Spec:** `docs/superpowers/specs/2026-09-13-internetscanner-gui-security-design.md`

## Global Constraints

- `authorizedOnly=true` remains the default.
- Active public scanning is allowed only for exact user-approved/allowlisted assets.
- Internet-wide enumeration and unbounded public CIDR scanning are out of scope.
- GUI controls are not a security boundary; every active probe path must pass the policy guard.
- No exploit execution, denial-of-service testing, brute force, credential attacks, malware, spoofing, stealth/evasion, or anonymous scanning.
- Vulnerability results distinguish `NOT_VULN`, `LIKELY_VULN`, and `VULN`; version/CPE matching alone cannot silently become confirmed vulnerability evidence.
- CI must use deterministic fixtures and must not probe external targets.
- Credentials, API keys, tokens, and secrets must never be serialized into projects, logs, exports, or source control.
- Rate and concurrency remain bounded by configuration and have hard engine-side ceilings.

---

### Task 1: Harden the canonical schema and authorization guard

**Files:**
- Create: `InternetScanner/nodejs/src/model.ts`
- Create: `InternetScanner/nodejs/src/policy.ts`
- Create: `InternetScanner/nodejs/test/policy.test.ts`
- Create: `InternetScanner/nodejs/test/model.test.ts`
- Modify: `InternetScanner/config/scanner.json`
- Modify: `InternetScanner/SCHEMA.md`
- Modify: existing `InternetScanner/languages/nodejs/index.js` only after the TypeScript contract is tested

**Interfaces:**
- `HostRecord`, `PortFinding`, `ServiceEvidence`, `VulnerabilityFinding`, `PublicMetadata`, `TopologyNode`, `TopologyEdge`, `ScanEvent`, and `ScanProject` are canonical serializable interfaces.
- `AuthorizationPolicy.authorize(target: Target): AuthorizationDecision` is the only permitted gateway to active probing.
- `assertAuthorizedTarget(target, policy)` throws a typed policy error for non-allowlisted public targets.

- [ ] **Step 1: Write failing tests for private/public IPv4 and IPv6 classification, exact public allowlists, and low-level probe bypass rejection.**
- [ ] **Step 2: Run `node --test InternetScanner/nodejs/test/policy.test.ts` and confirm failure because the canonical policy module does not yet exist.**
- [ ] **Step 3: Implement the minimal policy/model modules with explicit IPv4 RFC1918, loopback, link-local and IPv6 unique-local/link-local/loopback handling.**
- [ ] **Step 4: Run the focused tests and confirm all policy cases pass.**
- [ ] **Step 5: Add schema validation limits for target count, port count, concurrency and rate.**
- [ ] **Step 6: Run model serialization tests and verify credentials are rejected/redacted.**
- [ ] **Step 7: Commit `feat: add canonical scanner model and policy guard`.**

---

### Task 2: Build the event bus and scan controller

**Files:**
- Create: `InternetScanner/nodejs/src/events.ts`
- Create: `InternetScanner/nodejs/src/controller.ts`
- Create: `InternetScanner/nodejs/test/controller.test.ts`
- Create: `InternetScanner/nodejs/test/events.test.ts`

**Interfaces:**
- `EventBus.subscribe(listener)` and `EventBus.publish(event)` provide ordered structured events.
- `ScanController.start(request): ScanSession` returns a session with `pause()`, `resume()`, `cancel()`, and `snapshot()`.
- Events include `scan.started`, `target.authorized`, `host.discovered`, `probe.started`, `probe.completed`, `probe.timeout`, `probe.blocked`, `vulnerability.updated`, `export.completed`, and `scan.completed`.

- [ ] **Step 1: Write tests proving subscribers receive ordered scan events and cancellation changes the session state.**
- [ ] **Step 2: Run focused controller tests and confirm the expected missing-module failures.**
- [ ] **Step 3: Implement the event bus and session state machine without network operations.**
- [ ] **Step 4: Run the tests and verify start/pause/resume/cancel behavior.**
- [ ] **Step 5: Add hard caps for queue size and concurrent probes and test that excess work is rejected or queued rather than exceeding the configured ceiling.**
- [ ] **Step 6: Commit `feat: add scanner controller and event bus`.**

---

### Task 3: Implement authorized discovery and TCP/UDP IPv4/IPv6 engines

**Files:**
- Create: `InternetScanner/nodejs/src/discovery/interfaces.ts`
- Create: `InternetScanner/nodejs/src/discovery/ipv4.ts`
- Create: `InternetScanner/nodejs/src/discovery/ipv6.ts`
- Create: `InternetScanner/nodejs/src/probes/tcp.ts`
- Create: `InternetScanner/nodejs/src/probes/udp.ts`
- Create: `InternetScanner/nodejs/src/probes/engine.ts`
- Create: `InternetScanner/nodejs/test/discovery.test.ts`
- Create: `InternetScanner/nodejs/test/tcp.test.ts`
- Create: `InternetScanner/nodejs/test/udp.test.ts`

**Interfaces:**
- `discoverLocalTargets()` returns only locally connected/authorized targets.
- `probeTcp(target, port, options): Promise<PortFinding>` uses connect semantics and always calls the policy guard first.
- `probeUdp(target, port, options): Promise<PortFinding>` normalizes `open`, `closed`, `filtered`, and `open|filtered` without claiming certainty from silence.
- `ProbeEngine.scan(targets, ports, protocols)` enforces cancellation, timeout, rate and concurrency limits.

- [ ] **Step 1: Write deterministic tests using loopback/local test sockets for TCP open/closed and UDP response/no-response normalization.**
- [ ] **Step 2: Run the focused tests and confirm the new engine functions are absent.**
- [ ] **Step 3: Implement TCP connect probing with timeout and abort support.**
- [ ] **Step 4: Run TCP tests and verify open/closed/timeout states.**
- [ ] **Step 5: Implement UDP probing with conservative state semantics and protocol-family preservation.**
- [ ] **Step 6: Run UDP tests and verify no-response is represented as `open|filtered` rather than `open`.**
- [ ] **Step 7: Add IPv6 socket/address handling and tests for `::1` plus unique-local addresses.**
- [ ] **Step 8: Add local interface, route, ARP/neighbor-discovery adapters where the host platform exposes them, with unsupported capability reported as an event rather than treated as failure of the whole scan.**
- [ ] **Step 9: Commit `feat: add bounded tcp udp ipv4 ipv6 scanning`.**

Nmap documents TCP/UDP scanning, UDP's ambiguous `open|filtered` state, and IPv6 support; the implementation will preserve those semantics rather than inventing certainty. citeturn0search1turn0search3turn0search6

---

### Task 4: Add service and version evidence collection

**Files:**
- Create: `InternetScanner/nodejs/src/services/service-map.ts`
- Create: `InternetScanner/nodejs/src/services/fingerprint.ts`
- Create: `InternetScanner/nodejs/src/services/nmap-adapter.ts`
- Create: `InternetScanner/nodejs/test/fingerprint.test.ts`
- Create: `InternetScanner/nodejs/test/nmap-adapter.test.ts`
- Modify: `InternetScanner/SCHEMA.md`

**Interfaces:**
- `identifyService(portFinding, probeEvidence): ServiceEvidence` returns service, version, CPE candidates, evidence and confidence.
- `NmapAdapter.parseXml(xml): ScanProjectFragment` parses compatible Nmap XML but never executes an untrusted command string.
- `NmapAdapter.command(args): string[]` accepts a typed allowlisted argument structure and excludes exploit/DoS/brute-force/evasion flags.

- [ ] **Step 1: Write fixture tests for known TCP/UDP service banners and Nmap XML service/version output.**
- [ ] **Step 2: Run the tests and verify the parser/fingerprint functions fail before implementation.**
- [ ] **Step 3: Implement a small built-in service/port map plus evidence-based banner parser.**
- [ ] **Step 4: Add optional Nmap XML parsing and typed invocation configuration.**
- [ ] **Step 5: Test that unapproved NSE categories and shell metacharacters cannot enter the Nmap invocation.**
- [ ] **Step 6: Commit `feat: add service evidence and nmap adapter`.**

Nmap's version detection supports TCP/UDP, IPv6, service/version evidence and CPE output; its service-probe database also demonstrates protocol-specific safe probes. citeturn0search0turn0search5

---

### Task 5: Implement NVD/CPE vulnerability correlation

**Files:**
- Create: `InternetScanner/nodejs/src/vulnerability/cpe.ts`
- Create: `InternetScanner/nodejs/src/vulnerability/nvd-client.ts`
- Create: `InternetScanner/nodejs/src/vulnerability/correlator.ts`
- Create: `InternetScanner/nodejs/src/vulnerability/cache.ts`
- Create: `InternetScanner/nodejs/test/cpe.test.ts`
- Create: `InternetScanner/nodejs/test/nvd-client.test.ts`
- Create: `InternetScanner/nodejs/test/correlator.test.ts`
- Create: `InternetScanner/nodejs/test/fixtures/nvd-cve.json`

**Interfaces:**
- `normalizeCpe(evidence): CpeCandidate[]` normalizes vendor/product/version data.
- `NvdClient.getByCpe(cpe): Promise<NvdRecord[]>` reads the NVD API/cache through a bounded HTTP client.
- `correlate(serviceEvidence, nvdRecords): VulnerabilityFinding[]` produces confidence-aware findings.

- [ ] **Step 1: Write fixtures for an unaffected version, an affected version range, and an ambiguous version.**
- [ ] **Step 2: Run tests and verify the correlator fails because no CPE/version matching implementation exists.**
- [ ] **Step 3: Implement CPE normalization and version-range matching using NVD applicability semantics.**
- [ ] **Step 4: Implement bounded NVD retrieval with cache headers, timeouts, response-size limits and no secrets in logs.**
- [ ] **Step 5: Implement `NOT_VULN`, `LIKELY_VULN`, and `VULN` state transitions; never emit `VULN` from a version match alone.**
- [ ] **Step 6: Run fixture tests and verify all confidence states.**
- [ ] **Step 7: Commit `feat: add nvd cpe vulnerability correlation`.**

NVD defines CPE as a standardized product/platform identifier and exposes applicability/matching data that includes version ranges, making it suitable for evidence-based correlation rather than exploit execution. citeturn1search0turn1search1

---

### Task 6: Add passive public metadata enrichment

**Files:**
- Create: `InternetScanner/nodejs/src/metadata/reverse-dns.ts`
- Create: `InternetScanner/nodejs/src/metadata/rdap.ts`
- Create: `InternetScanner/nodejs/src/metadata/certificates.ts`
- Create: `InternetScanner/nodejs/test/metadata.test.ts`
- Modify: `InternetScanner/config/scanner.json`

**Interfaces:**
- `lookupReverseDns(ip): Promise<string[]>`
- `lookupRdap(ip): Promise<PublicMetadata>`
- `inspectCertificate(target): Promise<CertificateMetadata>` only after target authorization and only for a discovered authorized TLS service.

- [ ] **Step 1: Write fixture tests for malformed/oversized RDAP JSON and successful normalized records.**
- [ ] **Step 2: Run tests and verify failure before the clients exist.**
- [ ] **Step 3: Implement response-size, timeout and schema limits.**
- [ ] **Step 4: Add reverse-DNS normalization and RDAP organization/ASN/netblock fields.**
- [ ] **Step 5: Add certificate metadata extraction without storing private key material.**
- [ ] **Step 6: Commit `feat: add passive public metadata enrichment`.**

---

### Task 7: Build topology graph and map serialization

**Files:**
- Create: `InternetScanner/nodejs/src/topology/graph.ts`
- Create: `InternetScanner/nodejs/src/topology/layout.ts`
- Create: `InternetScanner/nodejs/test/topology.test.ts`
- Modify: `InternetScanner/SCHEMA.md`

**Interfaces:**
- `TopologyGraph.addNode(node)` and `addEvidenceEdge(edge)` preserve stable IDs.
- `buildTopology(scanProject): TopologyGraph` creates evidence-backed nodes/edges only.
- `serializeTopology(graph): TopologyJson` is stable and round-trip safe.

- [ ] **Step 1: Write tests for scanner, interface, gateway, subnet, host and service nodes.**
- [ ] **Step 2: Run tests and confirm graph functions are missing.**
- [ ] **Step 3: Implement stable node IDs and evidence-backed edges.**
- [ ] **Step 4: Add deterministic layout coordinates for repeatable rendering.**
- [ ] **Step 5: Test that unknown relationships are omitted or marked unknown rather than inferred as facts.**
- [ ] **Step 6: Commit `feat: add evidence based topology graph`.**

---

### Task 8: Implement project import/export and reporting

**Files:**
- Create: `InternetScanner/nodejs/src/io/project.ts`
- Create: `InternetScanner/nodejs/src/io/csv.ts`
- Create: `InternetScanner/nodejs/src/io/nmap-xml.ts`
- Create: `InternetScanner/nodejs/src/io/report.ts`
- Create: `InternetScanner/nodejs/test/io.test.ts`
- Create: `InternetScanner/nodejs/test/fixtures/sample-project.json`

**Interfaces:**
- `exportProject(project): string`
- `importProject(text): ScanProject`
- `exportCsv(project): string`
- `importNmapXml(text): ScanProjectFragment`
- `renderReport(project): string`

- [ ] **Step 1: Write round-trip tests for JSON, CSV and vulnerability/topology exports.**
- [ ] **Step 2: Run tests and verify serializers/validators are missing.**
- [ ] **Step 3: Implement schema validation and bounded parsing before object construction.**
- [ ] **Step 4: Implement JSON and CSV exports with stable ordering.**
- [ ] **Step 5: Implement compatible Nmap XML import and human-readable HTML/Markdown report output.**
- [ ] **Step 6: Test malicious oversized/unknown-field imports and verify secrets are rejected/redacted.**
- [ ] **Step 7: Commit `feat: add scanner project import export and reports`.**

---

### Task 9: Build the primary live web GUI

**Files:**
- Create: `InternetScanner/web/package.json`
- Create: `InternetScanner/web/src/index.html`
- Create: `InternetScanner/web/src/main.ts`
- Create: `InternetScanner/web/src/state.ts`
- Create: `InternetScanner/web/src/api.ts`
- Create: `InternetScanner/web/src/components/scan-controls.ts`
- Create: `InternetScanner/web/src/components/host-table.ts`
- Create: `InternetScanner/web/src/components/detail-panel.ts`
- Create: `InternetScanner/web/src/components/event-console.ts`
- Create: `InternetScanner/web/src/components/topology-map.ts`
- Create: `InternetScanner/web/src/components/vulnerability-table.ts`
- Create: `InternetScanner/web/src/styles.css`
- Create: `InternetScanner/nodejs/src/server.ts`
- Create: `InternetScanner/nodejs/test/server.test.ts`

**Interfaces:**
- `GET /api/state` returns a redacted `ScanSnapshot`.
- `POST /api/scan/start` accepts validated scan options.
- `POST /api/scan/:id/pause`, `/resume`, `/cancel` control sessions.
- `GET /api/events` streams structured scan events to the browser.
- `POST /api/import` accepts bounded project files.
- `GET /api/export/:format` returns JSON/CSV/report data.

- [ ] **Step 1: Write server tests for policy enforcement, event streaming and import/export endpoints.**
- [ ] **Step 2: Run tests and confirm endpoint failures.**
- [ ] **Step 3: Implement the local API server and typed request validation.**
- [ ] **Step 4: Implement scan controls showing scope, authorization, protocol, ports, rate and concurrency before start.**
- [ ] **Step 5: Implement live host/service/vulnerability tables and event console.**
- [ ] **Step 6: Implement topology canvas using stable graph coordinates and explicit legend for known/unknown relationships.**
- [ ] **Step 7: Implement import/export controls with visible validation errors.**
- [ ] **Step 8: Test keyboard navigation, readable contrast, responsive layouts and no hidden authorization state.**
- [ ] **Step 9: Commit `feat: add live InternetScanner web gui`.**

---

### Task 10: Integrate the language adapters and shared project format

**Files:**
- Modify: `InternetScanner/languages/nodejs/index.js`
- Modify: `InternetScanner/languages/typescript/scanner.ts`
- Modify: `InternetScanner/languages/python/scanner.py`
- Modify: `InternetScanner/languages/java/InternetScanner.java`
- Modify: `InternetScanner/languages/csharp/InternetScanner.cs`
- Modify: `InternetScanner/languages/cpp/internet_scanner.hpp`
- Modify: `InternetScanner/languages/rust/src/lib.rs`
- Modify: `InternetScanner/languages/go/scanner.go`
- Modify: `InternetScanner/languages/kotlin/InternetScanner.kt`
- Modify: `InternetScanner/languages/swift/InternetScanner.swift`
- Modify: `InternetScanner/languages/dart/internet_scanner.dart`
- Modify: `InternetScanner/languages/php/InternetScanner.php`
- Modify: `InternetScanner/languages/ruby/internet_scanner.rb`
- Create: per-language contract fixtures under each language's test directory

**Interfaces:**
- Each adapter exposes classification, authorization and normalized-result serialization using the same schema field names.
- Low-level active probes must either accept an authorization policy object or be explicitly marked as local-only test helpers; no public probing primitive may silently bypass policy.

- [ ] **Step 1: Write cross-language fixture expectations for IPv4/IPv6 scope and exact public allowlists.**
- [ ] **Step 2: Run each language's deterministic tests and record baseline failures.**
- [ ] **Step 3: Fix known issues: Node active-probe policy bypass, Python syntax/contract completeness, Rust IPv6 unique-local handling, C++ C++20-only `contains` usage or explicit compiler floor, and PHP reserved/invalid-address classification.**
- [ ] **Step 4: Add JSON fixture serialization tests where each language supports the required runtime.**
- [ ] **Step 5: Commit `refactor: align scanner language adapters with canonical contract`.**

---

### Task 11: Add CI, security regression tests and documentation

**Files:**
- Create: `.github/workflows/internet-scanner-validation.yml` or replace the existing workflow with the final matrix
- Create: `InternetScanner/SECURITY.md`
- Create: `InternetScanner/GUI.md`
- Create: `InternetScanner/VULNERABILITY-MODEL.md`
- Modify: `InternetScanner/README.md`
- Modify: root `README.md`
- Create: `InternetScanner/examples/local-scan.json`

**Interfaces:**
- CI executes deterministic unit tests for the canonical Node engine plus available language adapter tests.
- Documentation describes authorized-use requirements, GUI controls, import/export schema, vulnerability confidence, Nmap dependency boundaries and troubleshooting.

- [ ] **Step 1: Write policy-regression tests proving empty public allowlists block active public targets and that credentials never appear in serialized output.**
- [ ] **Step 2: Run the security tests locally and verify they fail if the guard is disabled.**
- [ ] **Step 3: Add the final CI matrix with Node tests and deterministic language checks.**
- [ ] **Step 4: Add documentation with concrete safe local-network examples and explicit public-target authorization behavior.**
- [ ] **Step 5: Validate every referenced file/path and remove stale root README citation markers.**
- [ ] **Step 6: Commit `docs: complete InternetScanner gui security documentation and ci`.**

---

### Task 12: Final verification and integration review

**Files:**
- No new production files unless verification exposes a defect; fixes must follow TDD with a regression test first.
- Review all `InternetScanner/**` changes and the implementation branch history.

- [ ] **Step 1: Run the canonical Node test suite from `InternetScanner/nodejs/`.**
- [ ] **Step 2: Run every deterministic language adapter test available in the repository.**
- [ ] **Step 3: Run import/export round-trip fixtures and verify byte-safe schema normalization.**
- [ ] **Step 4: Run a local-only integration test using loopback and ephemeral ports for TCP/UDP IPv4/IPv6 where the host supports IPv6.**
- [ ] **Step 5: Verify public active scanning with an empty allowlist is blocked at the engine, API, CLI/adapters and GUI layers.**
- [ ] **Step 6: Verify pause/resume/cancel and event-stream ordering.**
- [ ] **Step 7: Verify vulnerability fixtures produce the intended confidence states without any exploit or destructive check.**
- [ ] **Step 8: Inspect `git diff`, confirm no credentials/secrets/generated dependency caches were committed, and compare every implementation task against the design spec.**
- [ ] **Step 9: Only after fresh verification, create the final pull request from the implementation branch into `main` with a checklist of test commands and results.**

## Spec Coverage Review

- GUI requirements are covered by Tasks 2, 8 and 9.
- Local/intranet/public authorization is covered by Tasks 1, 2, 3, 9 and 11.
- IPv4/IPv6 discovery and TCP/UDP scanning are covered by Task 3.
- Service/version identification and optional Nmap interoperability are covered by Task 4.
- NVD/CPE vulnerability correlation and confidence states are covered by Task 5.
- Passive public metadata is covered by Task 6.
- Evidence-based topology maps are covered by Task 7 and Task 9.
- JSON/CSV/Nmap XML/report import/export is covered by Task 8.
- Cross-language compatibility is covered by Task 10.
- Deterministic CI, documentation and security regression coverage are covered by Task 11.
- Full verification against the specification is covered by Task 12.

## Execution Order

Tasks 1-2 establish the contract and controller. Tasks 3-8 can then be developed as independent engine subsystems with their own test cycles. Task 9 consumes those stable interfaces for the GUI. Task 10 aligns the existing language implementations. Task 11 adds CI/docs, and Task 12 is the final evidence gate before integration.

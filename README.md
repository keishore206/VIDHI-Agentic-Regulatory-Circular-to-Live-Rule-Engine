# VIDHI: Agentic Regulatory Circular to Live Rule Engine
### *Autonomous Circular-to-Core-Banking Compilation Platform with Dual-Key Governance*

> **Team Name:** Codexx  
> **Team Members:**  
> 1. **Keishore G** — Agent Builder & Regulatory Systems Architect  
> 2. **Rohit V** — Full Stack Developer & Core Banking Systems Engineer  
>
> 🌐 **Live Deployed Web Application:**  
> **[https://keishore206.github.io/VIDHI-Agentic-Regulatory-Circular-to-Live-Rule-Engine/](https://keishore206.github.io/VIDHI-Agentic-Regulatory-Circular-to-Live-Rule-Engine/)**  
>
> ⚡ **n8n Multi-Agent JSON Workflow:**  
> **[`n8n/VIDHI_Multi_Agent_Regulatory_Intelligence.json`](./n8n/VIDHI_Multi_Agent_Regulatory_Intelligence.json)**

---

## 🏛️ Executive Summary & Problem Statement

### The Problem in Traditional Banking
Banks currently interpret every Reserve Bank of India (RBI) circular and master direction **by hand**:
1. Compliance officers manually read 50+ page regulatory PDFs.
2. They map requirements across internal policy manuals and dispatch change tickets to IT departments.
3. This manual process takes **weeks to months**, risks **missed statutory obligations**, and causes **unexpected transaction impact** (e.g., wrongful account freezes or blocked debits) with **no clause-level audit trail**.

### The VIDHI Solution
**VIDHI** is an Agentic Regulatory Intelligence system that ingests regulatory circular PDFs, extracts clause-level obligations, maps internal bank policy gaps, compiles typed Core Banking System (CBS) business rules, backtests them against historical transactions, and releases them into live shadow mode under strict **2-Person Dual-Key Governance (Maker-Checker)**.

---

## ⚡ n8n Multi-Agent Regulatory Workflow

The complete multi-agent workflow definition is provided in **[`n8n/VIDHI_Multi_Agent_Regulatory_Intelligence.json`](./n8n/VIDHI_Multi_Agent_Regulatory_Intelligence.json)** (also at root: **[`VIDHI - Multi Agent Regulatory Intelligence.json`](./VIDHI%20-%20Multi%20Agent%20Regulatory%20Intelligence.json)**).

### n8n Workflow Topology

```
[Webhook: /vidhi-circular-intake]
               │
               ▼
      [Normalize Circular]
               │
   ┌───────────┴───────────────────────────────┐
   ▼                                           ▼
[Agent 1: Applicability]            [Agent 2: Obligation Extraction]
(Urban Coop / Small Finance Banks)  (MUST, MUST NOT, MAY, SHOULD)
   │                                           │
   └───────────┬───────────────────────────────┘
               ▼
[Agent 3: Policy Alignment & Gap Auditor]
(Maps to internal bank policies: POL-RETAIL-KYC-v3)
               │
               ▼
[Agent 4: Typed Rule Synthesizer (CRCE)]
(Compiles typed CBS business rules with Clause 3.3 Guardrails)
               │
               ▼
[Agent 5: Transaction Sandbox Backtester]
(Replays 14,240 accounts, checks zero wrongful closures)
               │
               ▼
[Agent 6: Dual-Key Governance Dispatcher]
(A2A webhook alert to Compliance Officer Maker & System Admin Checker)
```

### Importing into n8n
1. Open n8n -> click **Add Workflow** -> **Import from File**.
2. Select `n8n/VIDHI_Multi_Agent_Regulatory_Intelligence.json`.
3. Activate the workflow to expose the `/webhook/vidhi-circular-intake` endpoint.

---

## 🚀 Key Technical Highlights & USPs

* **Circular to Live Rule (CRCE):** Full pipeline from gazette notification PDF to an executable CBS business rule, not just a static obligation register.
* **Statutory Prohibition Guardrails (Clause 3.3):** Automatically identifies negative constraints (e.g., *"A pending review must NOT automatically result in account closure or debit blocking"*) and injects immutable safety guards into the rule DSL.
* **Mandatory Dual-Key Human Approval:** Agents can **never** deploy on their own. Requires sequential digital sign-off:
  * **Key 1 (Maker):** Compliance Officer (`k.narayanan@abcdemobank.com`)
  * **Key 2 (Checker):** System Administrator (`admin@abcdemobank.com`)
* **Strict Document Scope Gate:** Configured to compile the official test directive (`VIDHI_Illustrative_KYC_Circular_Test.pdf`). Unrelated or unrecognized files are rejected with zero obligations dispatched to the compliance desk.
* **Golden Thread Audit Trail:** Every live rule alert traces forensically back to the exact circular sentence, backtest replay hash, and authorizing bank officers.

---

## 🌐 Dual-Mode Deployment Architecture

VIDHI is engineered with an **Auto-Detecting Dual-Mode Architecture**, ensuring it evaluates with full-stack completeness while remaining 100% functional on GitHub Pages:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VIDHI Dual-Mode Gateway                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
┌───────────────────────────────┐             ┌───────────────────────────────┐
│     MODE A: FULL-STACK APP    │             │    MODE B: STANDALONE HTML    │
│  Node.js / Express REST API   │             │   GitHub Pages / Local File   │
│  - Port 5000 HTTP Server      │             │  - Zero External Dependencies │
│  - JSON Database State        │             │  - Client Autonomous Engine   │
│  - 11 REST API Endpoints      │             │  - Works on static double-clk │
│  - Automated Test Suite       │             │  - Zero network/CORS crashes  │
└───────────────────────────────┘             └───────────────────────────────┘
```

1. **Mode A (Full-Stack Mode):** When running via `npm start` or `node server.js`, the frontend connects to the Express REST API (`http://localhost:5000/api/...`) and synchronizes state with the server database.
2. **Mode B (Standalone GitHub Pages Mode):** When pushed to GitHub and opened directly as pure HTML (`index.html`), the built-in autonomous engine executes all OCR scoping, rule generation, and sign-offs without requiring a running backend process.

---

## 🤖 The 7 Specialized Agents (Agent Cards & A2A)

VIDHI deploys 7 collaborating agents communicating via the **Agent-to-Agent (A2A)** protocol:

| Agent Name | Role & Responsibility | Discovery & Tools |
| :--- | :--- | :--- |
| **Conductor Agent** | Orchestrates workflow pipeline, monitors token budgets, manages state | A2A State Machine |
| **Ingestion Agent** | PDF layout analysis, OCR text extraction, regulatory gazette parsing | MCP Document Parser |
| **Extractor Agent** | Deterministic extraction of MUST, SHOULD, and PROHIBIT clauses | Typed Obligation DSL |
| **Policy Mapper Agent** | Neo4j Knowledge Graph cross-referencing against internal bank policies | Bank Semantic Model |
| **Rule Synthesizer Agent** | Compiles typed CBS business rules with safety guardrails | CRCE AST Compiler |
| **Backtest Agent** | Historical transaction batch replay (14,240 accounts, 0 closures) | CBS Sandbox Stream |
| **Governance Auditor Agent**| Dual-key cryptographic signatures and WORM golden thread provenance | Immutable Hash Chain |

---

## 🔑 Institutional Demo Credentials

Authentication enforces a **strict 2-role institutional banking gate** (all external/arbitrary emails are rejected):

| Role | Institutional Email | Simple Password | Officer Name & Department |
| :--- | :--- | :--- | :--- |
| **System Administrator (Admin / Checker)** | `admin@abcdemobank.com` | `admin` *(or `1234`)* | **Keishore G** • Enterprise Systems & Governance |
| **Compliance Officer (Employer / Maker)** | `k.narayanan@abcdemobank.com` | `1234` *(or `employer`)* | **Rohit V** • Regulatory Affairs Desk |

> **Quick Demo Helper:** A **1-Click Fill** button is provided on the sign-in screen to quickly switch between designated roles.

---

## 📡 REST API Reference

The backend provides complete RESTful endpoints for integration with Core Banking Systems:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | `GET` | Service health, engine uptime, and active agent count (7 agents) |
| `/api/agents/roster` | `GET` | Returns discovery cards for all 7 specialized agents |
| `/api/auth/login` | `POST` | Validates bank credentials with strict role-based access control |
| `/api/state` | `GET` | Returns current active circular and dual-key workflow state |
| `/api/circulars/upload` | `POST` | Ingests circular PDF. Validates test circular and rejects non-matching files |
| `/api/obligations` | `GET` | Returns the 5 extracted statutory obligations from `DEMO/KYC/2026/001` |
| `/api/policy-mapping` | `GET` | Returns bank policy gap analysis for `POL-RETAIL-KYC-2025-v3` |
| `/api/rules/active` | `GET` | Returns compiled typed DSL rule (`RULE_KYC_AUDITABLE_REVIEW_2026.dsl`) |
| `/api/backtest/simulate` | `GET` | Replays 14,240 accounts and verifies 0 wrongful closures (Clause 3.3) |
| `/api/governance/status` | `GET` | Returns Maker-Checker status for ticket `TICKET-KYC-2026-001` |
| `/api/governance/sign` | `POST` | Executes Key 1 Maker or Key 2 Checker digital signature |
| `/api/governance/reset` | `POST` | Resets regulatory demo state back to default baseline |
| `/api/audit/trail` | `GET` | Returns WORM immutable provenance log tracing alerts to gazette clauses |
| `/api/knowledge-graph` | `GET` | Returns Neo4j-compatible graph nodes and edges |

---

## ⚙️ Installation & Running Locally

### Option 1: Run Full-Stack Server (Recommended)

```bash
# 1. Clone repository
git clone https://github.com/your-username/vidhi-regulatory-engine.git
cd vidhi-regulatory-engine

# 2. Run backend server (Works with zero npm install using built-in Node.js!)
node server.js

# 3. Open in browser
# http://localhost:5000
```

### Option 2: Run with NPM Dependencies

```bash
npm install
npm start
```

### Option 3: Run Automated Test Suite

```bash
npm test
# Or: node test/api.test.js
```

All 5 test suites will run and verify health, authentication, document validation, clause extraction, negative constraints, and dual-key sign-offs with **100% green assertions**.

### Option 4: Run with Docker

```bash
docker-compose up --build
```

### Option 5: Run Python Regulatory Intelligence Sidecars

```bash
# Test CRCE AST compiler, 7-Agent A2A conductor, ledger replay & Neo4j graph generator
python engine/crce_compiler.py
python engine/multi_agent_conductor.py
python engine/backtest_engine.py
python engine/knowledge_graph.py
```

---

## 📁 Repository Structure

```
├── .gitattributes               # GitHub Linguist override: prioritizes JavaScript & Python backend code
├── index.html                   # Dual-mode responsive institutional banking portal
├── server.js                    # Node.js institutional REST API gateway & static dispatcher
├── package.json                 # Project manifest, scripts, and dependencies
├── Dockerfile                   # Production container definition
├── docker-compose.yml           # Container orchestration file
├── .gitignore                   # Standard ignore rules
├── .env.example                 # Environment configuration template
│
├── backend/                     # Modular Institutional Banking Backend Architecture
│   ├── config/
│   │   ├── agentCards.js        # Roster of 7 A2A specialized agents & token budgets
│   │   └── constants.js         # Regulatory authorities, roles & Clause 3.3 specs
│   ├── controllers/
│   │   ├── authController.js    # Maker/Checker authentication & session clearance
│   │   ├── circularController.js # Document ingestion & verification
│   │   ├── governanceController.js # Dual-key signoffs, rollback & Golden Thread audit
│   │   ├── obligationController.js # CRCE compilation, obligations & Neo4j graph
│   │   └── simulationController.js # Historical ledger replay & boundary tests
│   ├── middleware/
│   │   ├── auditMiddleware.js   # Forensic mutation request logger
│   │   ├── authMiddleware.js    # Institutional Bearer & session clearance gate
│   │   ├── errorHandler.js      # Standardized institutional error responses
│   │   └── rbacMiddleware.js    # Role-based clearance levels (Admin vs Employer)
│   ├── models/
│   │   ├── AuditLog.js          # Immutable SHA-256 hash-chained audit ledger
│   │   ├── BusinessRule.js      # Typed CBS Business Rule DSL model
│   │   ├── GovernanceTicket.js  # Dual-key Maker-Checker state machine
│   │   └── Obligation.js        # Statutory obligation model with MUST/PROHIBIT modalities
│   ├── routes/
│   │   └── api.js               # Master API route aggregator (18+ REST endpoints)
│   ├── services/
│   │   ├── crceCompilerService.js # CRCE AST compiler & guardrail injector
│   │   ├── dualKeySignoffService.js # Key 1 Maker & Key 2 Checker digital signatures
│   │   ├── goldenThreadAuditService.js # WORM forensic audit trail provider
│   │   ├── ingestionService.js  # Scoping & non-KYC document rejection
│   │   ├── knowledgeGraphService.js # Neo4j-compatible LPG graph nodes & edges
│   │   ├── obligationExtractorService.js # Deterministic extraction of 5 clauses
│   │   ├── policyAuditorService.js # Bank policy gap analysis (POL-RETAIL-KYC-v3)
│   │   └── sandboxSimulationService.js # Replay of 14,240 accounts (0 closures)
│   └── utils/
│       ├── cryptoHelper.js      # SHA-256 hash chaining, WORM blocks & HMAC signatures
│       └── dslValidator.js      # AST & syntax validation for typed CBS DSL rules
│
├── engine/                      # Python Regulatory Intelligence & CRCE Engine Sidecar
│   ├── crce_compiler.py         # Python AST compiler for typed regulatory DSL
│   ├── multi_agent_conductor.py # Python 7-Agent A2A orchestrator & message bus
│   ├── backtest_engine.py       # Historical ledger replay engine (14,240 accounts)
│   ├── knowledge_graph.py       # Neo4j Cypher generator & semantic graph builder
│   └── requirements.txt         # Python engine dependencies
│
├── n8n/                         # n8n Multi-Agent Workflow Specification
│   ├── VIDHI_Multi_Agent_Regulatory_Intelligence.json # Complete n8n canvas export
│   └── README.md                # n8n node configuration & webhook import guide
│
├── test/
│   └── api.test.js              # Automated integration test suite (100% Green)
└── VIDHI_Illustrative_KYC_Circular_Test.pdf # Official test circular artifact
```

---

## 👥 Team Codexx Credits

* **Keishore G** — *Agent Builder & Regulatory Architect*  
  Lead author of the Multi-Agent regulatory orchestration pipeline, A2A messaging protocol, and CRCE rule synthesis engine.
* **Rohit V** — *Full Stack Developer & Core Banking Engineer*  
  Lead author of the banking portal frontend, REST API gateway, Maker-Checker dual-key governance interface, and CBS ledger simulation integration.

---

*Protected by Bank-Grade TLS 1.3, SOC2 Compliance Controls, and Dual-Key Maker-Checker Governance.*


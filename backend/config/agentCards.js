/**
 * ==============================================================================
 * VIDHI Multi-Agent Regulatory Intelligence — Agent Cards & Discovery Roster
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

const AGENT_CARDS = [
  {
    id: "conductor",
    name: "Conductor Agent",
    role: "A2A Workflow Orchestrator & State Coordinator",
    protocol: "A2A v1.2",
    model: "gemini-2.5-pro / claude-3-5-sonnet",
    tokenLimitPerTurn: 4096,
    maxIterations: 8,
    responsibilities: [
      "Coordinates pipeline: Intake -> Extractor -> Mapper -> Synthesizer -> Backtest -> Governance",
      "Enforces per-agent token limits and prevents hallucinated circular references",
      "Maintains global distributed transaction state across all worker agents"
    ],
    toolsAllowlist: ["state_transition", "token_budget_check", "a2a_broadcast"]
  },
  {
    id: "ingestion",
    name: "Circular Ingestion Agent",
    role: "OCR, Layout Analysis & Gazette Normalizer",
    protocol: "MCP / Textract Stream",
    model: "gemini-2.5-flash",
    tokenLimitPerTurn: 8192,
    maxIterations: 5,
    responsibilities: [
      "Parses multi-page regulatory circular PDFs, Gazette notifications, and master directions",
      "Extracts metadata: authority, circular ref, notification date, effective date",
      "Performs scope verification: Scheduled Commercial Banks vs NBFCs vs Co-ops"
    ],
    toolsAllowlist: ["pdf_parse_mcp", "ocr_extract", "metadata_normalize"]
  },
  {
    id: "extractor",
    name: "Obligation Extractor Agent",
    role: "Deterministic Clause Modality Classifier",
    protocol: "A2A / Typed-Obligation",
    model: "gemini-2.5-pro",
    tokenLimitPerTurn: 4096,
    maxIterations: 6,
    responsibilities: [
      "Decomposes text into discrete, machine-readable statutory obligations",
      "Classifies modalities: MUST (Mandatory), SHOULD (Advisory), MUST NOT (Prohibition Guardrail)",
      "Pinpoints evidence span with character offsets for golden thread auditability"
    ],
    toolsAllowlist: ["modality_classifier", "evidence_span_indexer", "obligation_registry_write"]
  },
  {
    id: "mapper",
    name: "Policy Mapping Agent",
    role: "Bank Semantic Model & Policy Gap Auditor",
    protocol: "Neo4j Semantic KG",
    model: "gemini-2.5-flash",
    tokenLimitPerTurn: 4096,
    maxIterations: 5,
    responsibilities: [
      "Traverses Regulatory Knowledge Graph against Bank Internal Policies (e.g. POL-RETAIL-KYC-v3)",
      "Detects policy coverage gaps, outdated thresholds, and missing operational SLAs",
      "Recommends automated CBS rule synthesis to bridge identified regulatory gaps"
    ],
    toolsAllowlist: ["graph_query_cypher", "semantic_distance_calc", "policy_gap_emitter"]
  },
  {
    id: "compiler",
    name: "Rule Synthesizer Agent (CRCE)",
    role: "Typed CBS Business Rule DSL Compiler",
    protocol: "CRCE AST Engine",
    model: "gemini-2.5-pro",
    tokenLimitPerTurn: 4096,
    maxIterations: 7,
    responsibilities: [
      "Translates obligations into typed Core Banking System (CBS) domain-specific rules",
      "Injects negative constraint guardrails (e.g. Clause 3.3 account closure prohibition)",
      "Performs AST validation, comparator checking, and unit boundary verification"
    ],
    toolsAllowlist: ["dsl_ast_compiler", "guardrail_injector", "syntax_linter"]
  },
  {
    id: "backtester",
    name: "Transaction Simulation Agent",
    role: "Historical Sandbox Replay & Impact Analyzer",
    protocol: "CBS Ledger Stream",
    model: "gemini-2.5-flash",
    tokenLimitPerTurn: 8192,
    maxIterations: 4,
    responsibilities: [
      "Replays synthetic and historical transaction batches (14,240 retail accounts)",
      "Measures customer friction, false positive freezes, and RM follow-up dispatch SLAs",
      "Arms auto-rollback kill-switch if operational anomaly threshold (>0.1% freezes) is tripped"
    ],
    toolsAllowlist: ["ledger_stream_replay", "anomaly_evaluator", "auto_rollback_arm"]
  },
  {
    id: "governance",
    name: "Governance Auditor Agent",
    role: "Dual-Key Maker-Checker & Golden Thread Ledger",
    protocol: "WORM Cryptographic Ledger",
    model: "gemini-2.5-pro",
    tokenLimitPerTurn: 2048,
    maxIterations: 3,
    responsibilities: [
      "Manages sequential 2-person authorization: Key 1 Maker sign-off, Key 2 Checker release",
      "Records cryptographic SHA-256 hash-chained immutable audit trail",
      "Produces supervisory examination dossiers for RBI inspection audits"
    ],
    toolsAllowlist: ["dual_key_sign", "sha256_chain_append", "dossier_export"]
  }
];

module.exports = { AGENT_CARDS };


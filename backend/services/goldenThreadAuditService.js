/**
 * ==============================================================================
 * VIDHI Backend Engine — Golden Thread WORM Cryptographic Provenance Service
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

const { GoldenThreadLedger } = require('../models/AuditLog');

const auditLedger = new GoldenThreadLedger();

// Pre-populate with KYC verification steps
auditLedger.append("CIRCULAR_GAZETTE_INGESTION", {
  circular: "DEMO/KYC/2026/001",
  source: "VIDHI_Illustrative_KYC_Circular_Test.pdf",
  clausesIdentified: ["3.1", "3.2", "3.3", "4.3", "5.1"]
});

auditLedger.append("NEGATIVE_CONSTRAINT_VERIFIED", {
  clause: "Clause 3.3",
  constraint: "BLOCK_TRANSACTION = FALSE, CLOSE_ACCOUNT = FALSE",
  simulationStatus: "14,240 Accounts Replayed - 0 Accounts Blocked"
});

function getAuditTrail(makerSigned = false, checkerSigned = false) {
  return {
    incidentId: "INCIDENT-PROVENANCE-#90412",
    provenanceIntegrity: "100% Cryptographically Verified (SHA-256 Hash Chain)",
    ledgerBlocks: auditLedger.getHistory(),
    goldenThreadSteps: [
      {
        step: 1,
        title: "1. Gazette Source Clause",
        detail: "VIDHI_Illustrative_KYC_Circular_Test.pdf • Clause 3.2: 48h auditable follow-up task generation.",
        status: "VERIFIED"
      },
      {
        step: 2,
        title: "2. Negative Constraint Check (Clause 3.3)",
        detail: "Account #892104 was NOT closed or blocked. Zero customer friction applied.",
        status: "GUARDRAIL_ACTIVE"
      },
      {
        step: 3,
        title: "3. Dual-Key Authorization History",
        detail: `Maker: ${makerSigned ? 'K. S. Narayanan (Signed)' : 'Pending'} • Checker: ${checkerSigned ? 'Keishore G (Signed)' : 'Pending'}`,
        status: checkerSigned ? "CBS_RELEASED" : (makerSigned ? "MAKER_ENDORSED" : "PENDING")
      }
    ]
  };
}

module.exports = {
  auditLedger,
  getAuditTrail
};


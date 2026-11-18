/**
 * ==============================================================================
 * VIDHI Backend Engine — Configuration & Regulatory Constants
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

const REGULATORY_AUTHORITIES = {
  RBI: "Reserve Bank of India (Department of Regulation)",
  SEBI: "Securities and Exchange Board of India",
  FICTIONAL_TEST: "Fictional Regulatory Test Authority",
  BASEL: "Basel Committee on Banking Supervision"
};

const BANK_TIERS = {
  URBAN_COOP: {
    segment: "Urban Cooperative & Small Finance Banks",
    regulatoryLoad: "Full RBI Regulatory Burden with Lean Compliance Teams",
    slaGraceHours: 48
  },
  NBFC: {
    segment: "NBFCs (Mid and Upper Layer)",
    regulatoryLoad: "Fast Changing Scale-Based Rules & Digital Lending Norms",
    slaGraceHours: 24
  },
  LARGE_SCHEDULED: {
    segment: "Large Scheduled Commercial Banks",
    regulatoryLoad: "Regulation-to-Rule Layer over Legacy AML/CBS Engines",
    slaGraceHours: 12
  }
};

const AUTHORIZED_ACCOUNTS = {
  "admin@abcdemobank.com": {
    email: "admin@abcdemobank.com",
    roleKey: "admin",
    passwords: ["admin", "Admin@vidhi2025", "1234"],
    fullName: "Keishore G",
    bankTitle: "System Administrator",
    department: "Enterprise Systems & Governance",
    clearanceLevel: "LEVEL_2_CHECKER",
    permissions: [
      "CIRCULAR_INGEST",
      "OCR_EXECUTE",
      "DSL_COMPOSE",
      "BACKTEST_RUN",
      "CHECKER_SIGN_KEY2",
      "CBS_SHADOW_DEPLOY",
      "CORE_KILL_SWITCH",
      "AUDIT_EXPORT"
    ]
  },
  "k.narayanan@abcdemobank.com": {
    email: "k.narayanan@abcdemobank.com",
    roleKey: "employee",
    passwords: ["1234", "employer", "Employer@vidhi2025", "admin", "user"],
    fullName: "K. S. Narayanan",
    bankTitle: "Compliance Officer / Employer",
    department: "Regulatory Compliance & AML Operations",
    clearanceLevel: "LEVEL_1_MAKER",
    permissions: [
      "OBLIGATION_REVIEW",
      "POLICY_GAP_REMEDY",
      "MAKER_SIGN_KEY1",
      "RULE_ENDORSE",
      "EXAMINATION_VIEW"
    ]
  }
};

const CLAUSE_3_3_SPEC = {
  clauseRef: "Clause 3.3",
  circularRef: "DEMO/KYC/2026/001",
  type: "NEGATIVE_CONSTRAINT_GUARDRAIL",
  description: "Statutory prohibition on automatic account closure or transaction/debit freezing solely on pending review status.",
  enforcedInDsl: true,
  guardrailCode: "Account.debit_freeze = false; Account.account_closed = false;",
  guaranteeMetric: "0 Accounts Blocked / 0 Accounts Closed"
};

module.exports = {
  REGULATORY_AUTHORITIES,
  BANK_TIERS,
  AUTHORIZED_ACCOUNTS,
  CLAUSE_3_3_SPEC,
  DEFAULT_PORT: process.env.PORT || 5000,
  DEFAULT_CIRCULAR_NAME: "VIDHI_Illustrative_KYC_Circular_Test.pdf"
};

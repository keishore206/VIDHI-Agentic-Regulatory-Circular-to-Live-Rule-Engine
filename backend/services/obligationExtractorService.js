/**
 * ==============================================================================
 * VIDHI Backend Engine — Deterministic Obligation Extractor Service
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

const { StatutoryObligation } = require('../models/Obligation');

const OBLIGATION_SEEDS = [
  {
    clause: "3.1",
    circularRef: "DEMO/KYC/2026/001",
    category: "MANDATORY DATA QUALITY",
    title: "Customer KYC Review Date Tracking",
    text: "The bank shall maintain a record of the date on which each customer's KYC information was last reviewed. The record shall be associated with a unique internal customer reference... Where no reliable review date is available, the record shall be marked as 'date unavailable' rather than populated with an assumed date.",
    targetField: "CUSTOMER_MASTER.LAST_KYC_DATE",
    status: "MAPPED_TO_CORE_LEDGER",
    guardrail: false,
    modality: "MUST"
  },
  {
    clause: "3.2",
    circularRef: "DEMO/KYC/2026/001",
    category: "MANDATORY OPERATIONAL SLA",
    title: "Pending Review Auditable Follow-Up Task Router",
    text: "Where a customer's KYC review is pending, the bank shall identify the record for review and create an auditable follow-up task. The task shall include customer reference, reason/trigger, task creation timestamp, assigned team/responsible officer, target completion date, current status and escalation history.",
    targetField: "BRANCH_CRM.DISPATCH_TASK(sla_hours=48)",
    status: "REMEDIATED_VIA_DSL_RULE",
    guardrail: false,
    modality: "MUST"
  },
  {
    clause: "3.3",
    circularRef: "DEMO/KYC/2026/001",
    category: "STATUTORY PROHIBITION (GUARDRAIL)",
    title: "Prohibition on Automatic Account Closure or Debit Freezing",
    text: "A pending review must not automatically result in account closure or transaction blocking solely under this illustrative instruction. A pending-review flag or task status shall not, by itself, be treated by the test rule engine as an instruction to close an account, suspend access or block a transaction.",
    targetField: "SAFETY_GUARD(BLOCK_TRANSACTION = FALSE, CLOSE_ACCOUNT = FALSE)",
    status: "ENFORCED_IN_DSL_GUARDRAIL",
    guardrail: true,
    modality: "MUST NOT"
  },
  {
    clause: "4.3 & 4.4",
    circularRef: "DEMO/KYC/2026/001",
    category: "SUPERVISORY EVIDENCE",
    title: "Point-in-Time Reproducibility & Role-Based Audit Permissions",
    text: "Records should be sufficiently complete to allow an authorised reviewer to reproduce the status of a review as at a specified point in time... Access to review records and audit history should be restricted according to documented role-based permissions.",
    targetField: "AUDIT_LOG_IMMUTABLE(SHA256_HASH_CHAIN)",
    status: "GOLDEN_THREAD_ACTIVE",
    guardrail: false,
    modality: "SHOULD"
  },
  {
    clause: "5.1",
    circularRef: "DEMO/KYC/2026/001",
    category: "STATUTORY TIMELINE",
    title: "Statutory Effective Date & Implementation Timeline",
    text: "This instruction takes effect on 01 January 2027. Regulated institutions shall ensure all core banking business rules, task routing workflows, and point-in-time audit logs are operational in live shadow mode prior to the effective date.",
    targetField: "EFFECTIVE_DATE: 2027-01-01 (44 Days Remaining)",
    status: "MANDATORY_CALIBRATION_SET",
    guardrail: false,
    modality: "MUST"
  }
];

function getExtractedObligations(isUploaded = true) {
  if (!isUploaded) return [];
  return OBLIGATION_SEEDS.map(seed => new StatutoryObligation(seed).toJSON());
}

function extractObligations(circularId) {
  return getExtractedObligations(true);
}

module.exports = {
  OBLIGATION_SEEDS,
  getExtractedObligations,
  extractObligations
};

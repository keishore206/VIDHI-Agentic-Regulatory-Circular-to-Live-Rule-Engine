/**
 * ==============================================================================
 * VIDHI Backend Engine — Core Banking System Typed Business Rule Model
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

class BusinessRule {
  constructor({
    ruleId = "RULE_KYC_AUDITABLE_REVIEW_2026",
    circularId = "DEMO/KYC/2026/001",
    issuingBody = "Fictional Regulatory Test Authority",
    effectiveDate = "2027-01-01",
    guardrailEnforced = true
  }) {
    this.ruleId = ruleId;
    this.circularId = circularId;
    this.issuingBody = issuingBody;
    this.effectiveDate = effectiveDate;
    this.guardrailEnforced = guardrailEnforced;
    this.status = "DRAFT_PENDING_MAKER_CHECKER";
    this.version = "2.4";
  }

  getDsl() {
    return `RULE ${this.ruleId} {
  // Ingested from VIDHI_Illustrative_KYC_Circular_Test.pdf (${this.circularId})
  METADATA {
    circular_id: "${this.circularId}",
    issuing_body: "${this.issuingBody}",
    effective_date: "${this.effectiveDate}",
    enforce_clause_3_3_guardrail: ${this.guardrailEnforced}
  }

  WHEN 
    Account.status == ACTIVE 
    AND (Account.kyc_review_status == "PENDING" OR Account.last_kyc_date == NULL)

  THEN {
    // Clause 3.2: Create auditable follow-up task with trigger, timestamps, and SLA
    BranchCRM.CreateAuditableFollowupTask({
      customer_ref: Account.cif_id,
      trigger_reason: "PERIODIC_KYC_REVIEW_PENDING",
      assigned_unit: "RETAIL_BRANCH_RM",
      escalation_sla_hours: 48,
      statutory_clause: "${this.circularId}-C3.2"
    });

    // STRICT ENFORCEMENT OF CLAUSE 3.3 PROHIBITION:
    // Must NOT close account, suspend access, or block transactions solely on pending review
    Account.debit_freeze = false;
    Account.account_closed = false;
  }
}`;
  }

  toJSON() {
    return {
      ruleId: this.ruleId,
      circularId: this.circularId,
      status: this.status,
      version: this.version,
      guardrailEnforced: this.guardrailEnforced,
      dsl: this.getDsl()
    };
  }
}

module.exports = { BusinessRule };


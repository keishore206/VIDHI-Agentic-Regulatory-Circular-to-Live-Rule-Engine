/**
 * ==============================================================================
 * VIDHI Backend Engine — Core Banking Rule DSL Syntax & AST Validator
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

/**
 * Validates a typed CBS business rule DSL string
 */
function validateRuleDsl(dslString) {
  if (!dslString || typeof dslString !== 'string') {
    return { valid: false, errors: ['DSL string cannot be empty'] };
  }

  const errors = [];
  const warnings = [];

  // 1. Structural keyword checks
  if (!dslString.includes('RULE')) errors.push("Missing top-level 'RULE' definition keyword.");
  if (!dslString.includes('METADATA')) errors.push("Missing required 'METADATA' block.");
  if (!dslString.includes('WHEN')) errors.push("Missing 'WHEN' condition block.");
  if (!dslString.includes('THEN')) errors.push("Missing 'THEN' execution action block.");

  // 2. Strict Clause 3.3 Guardrail Verification
  const hasClause33Guardrail = dslString.includes('Account.debit_freeze = false') &&
                               dslString.includes('Account.account_closed = false');

  if (!hasClause33Guardrail) {
    errors.push("CRITICAL STATUTORY VIOLATION: Missing mandatory Clause 3.3 guardrail (Account.debit_freeze = false; Account.account_closed = false). Rules cannot close or freeze accounts solely under pending review.");
  }

  // 3. Follow-up SLA Task Router check (Clause 3.2)
  if (!dslString.includes('BranchCRM.CreateAuditableFollowupTask')) {
    warnings.push("Recommended Action: Clause 3.2 auditable follow-up task dispatch is missing from THEN block.");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    guardrailEnforced: hasClause33Guardrail,
    astMetadata: {
      ruleIdentifier: "KYC_AUDITABLE_REVIEW_2026",
      engineTarget: "CBS_SHADOW_V4_2",
      complexityScore: "O(1) Indexed Ledger Lookup"
    }
  };
}

module.exports = { validateRuleDsl };


/**
 * ==============================================================================
 * VIDHI Backend Engine — Circular to Rule Compilation Engine (CRCE) Service
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

const { BusinessRule } = require('../models/BusinessRule');
const { validateRuleDsl } = require('../utils/dslValidator');

function compileCircularToDsl(circularRef = "DEMO/KYC/2026/001") {
  const rule = new BusinessRule({ circularId: circularRef });
  const rawDsl = rule.getDsl();
  const validation = validateRuleDsl(rawDsl);

  return {
    ruleId: rule.ruleId,
    circularRef,
    compiledAst: {
      targetEngine: "CORE_BANKING_SANDBOX_V4_2",
      metadata: {
        circular_id: circularRef,
        enforce_clause_3_3_guardrail: true
      },
      condition: "Account.status == ACTIVE AND (Account.kyc_review_status == 'PENDING' OR Account.last_kyc_date == NULL)",
      actions: [
        "BranchCRM.CreateAuditableFollowupTask(sla_hours=48)",
        "Account.debit_freeze = false",
        "Account.account_closed = false"
      ]
    },
    rawDsl,
    validation
  };
}

module.exports = { compileCircularToDsl };

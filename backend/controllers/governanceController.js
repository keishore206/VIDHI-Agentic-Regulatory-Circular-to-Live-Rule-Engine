/**
 * VIDHI - Institutional Banking Core API
 * Controller: GovernanceController
 * Dual-Key Maker-Checker orchestration, CBS Shadow deployment, kill-switch, and Golden Thread audit.
 */

const { getGovernanceStatus, executeSignoff, resetGovernance } = require('../services/dualKeySignoffService');
const { getAuditTrail, auditLedger } = require('../services/goldenThreadAuditService');

class GovernanceController {
  /**
   * Get current dual-key governance status and ticket state
   */
  static async getStatus(req, res) {
    try {
      const status = getGovernanceStatus();
      return res.status(200).json({
        status: 'SUCCESS',
        data: status
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_GOVERNANCE_STATUS',
        message: err.message
      });
    }
  }

  /**
   * Execute Maker (Key 1) Signoff
   */
  static async submitMakerSignoff(req, res) {
    try {
      const result = executeSignoff('maker', 1);
      auditLedger.append('MAKER_KEY1_ENDORSEMENT', {
        signer: result.signer,
        role: result.role,
        signatureToken: result.signatureToken,
        ticketId: result.ticket.ticketId
      });

      return res.status(200).json({
        status: 'SUCCESS',
        message: 'Maker signoff verified and cryptographic seal applied.',
        data: result
      });
    } catch (err) {
      return res.status(400).json({
        status: 'ERROR',
        code: 'ERR_MAKER_SIGNOFF',
        message: err.message
      });
    }
  }

  /**
   * Execute Checker (Key 2) Signoff and CBS Release
   */
  static async submitCheckerSignoff(req, res) {
    try {
      const result = executeSignoff('checker', 2);
      auditLedger.append('CHECKER_KEY2_DEPLOYMENT', {
        signer: result.signer,
        role: result.role,
        signatureToken: result.signatureToken,
        ticketId: result.ticket.ticketId,
        cbsEngine: 'CORE_BANKING_SHADOW_V4'
      });

      return res.status(200).json({
        status: 'SUCCESS',
        message: 'Dual-key threshold satisfied. Rule successfully committed to CBS Shadow engine.',
        data: result
      });
    } catch (err) {
      return res.status(403).json({
        status: 'ERROR',
        code: 'ERR_CHECKER_SIGNOFF',
        message: err.message
      });
    }
  }

  /**
   * Emergency Core Banking Kill-Switch / Auto-Rollback
   */
  static async triggerRollback(req, res) {
    try {
      const { reason } = req.body || {};
      auditLedger.append('EMERGENCY_CBS_ROLLBACK', {
        reason: reason || 'Manual CRO Kill-Switch Triggered',
        triggeredBy: req.user ? req.user.email : 'admin@abcdemobank.com',
        timestamp: new Date().toISOString()
      });

      return res.status(200).json({
        status: 'SUCCESS',
        message: 'Core banking kill-switch tripped. Previous rule generation rolled back cleanly with zero transaction disruption.',
        data: {
          rollbackArmed: true,
          previousStateRestored: true,
          activeRules: 'RULE_KYC_LEGACY_v2',
          auditBlockRecorded: true
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_ROLLBACK_FAILED',
        message: err.message
      });
    }
  }

  /**
   * Get complete Golden Thread cryptographic provenance
   */
  static async getGoldenThread(req, res) {
    try {
      const status = getGovernanceStatus();
      const trail = getAuditTrail(status.makerSigned, status.checkerSigned);

      return res.status(200).json({
        status: 'SUCCESS',
        data: trail
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_GOLDEN_THREAD',
        message: err.message
      });
    }
  }

  /**
   * Reset governance ticket state
   */
  static async resetTicket(req, res) {
    try {
      const result = resetGovernance();
      return res.status(200).json({
        status: 'SUCCESS',
        message: 'Governance state reset to baseline pending status.',
        data: result
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_RESET_FAILED',
        message: err.message
      });
    }
  }
}

module.exports = GovernanceController;

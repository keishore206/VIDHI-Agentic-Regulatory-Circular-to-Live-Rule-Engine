/**
 * ==============================================================================
 * VIDHI Backend Engine — Dual-Key Maker-Checker Governance Ticket Model
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

class GovernanceTicket {
  constructor(ticketId, ruleIdentifier, circularReference) {
    this.ticketId = ticketId || `TICKET-KYC-${Date.now()}`;
    this.ruleIdentifier = ruleIdentifier || "RULE_KYC_AUDITABLE_REVIEW_2026";
    this.circularReference = circularReference || "DEMO/KYC/2026/001";
    this.status = "AWAITING_KEY1_MAKER_SIGNATURE";
    this.makerSigned = false;
    this.checkerSigned = false;
    this.makerSignTime = null;
    this.checkerSignTime = null;
    this.makerSigner = "K. S. Narayanan (Compliance Officer)";
    this.checkerSigner = "Keishore G (System Administrator)";
    this.cbsShadowReleased = false;
    this.auditEventChain = [];
  }

  signMaker(timestamp) {
    this.makerSigned = true;
    this.makerSignTime = timestamp || new Date().toLocaleTimeString() + " IST";
    this.status = "AWAITING_KEY2_CHECKER_AUTHORIZATION";
    this.auditEventChain.push({
      action: "KEY1_MAKER_SIGNATURE_EXECUTED",
      signer: this.makerSigner,
      timestamp: this.makerSignTime
    });
  }

  signChecker(timestamp) {
    if (!this.makerSigned) {
      throw new Error("Governance Protocol Violation: Maker signature required before Checker authorization.");
    }
    this.checkerSigned = true;
    this.checkerSignTime = timestamp || new Date().toLocaleTimeString() + " IST";
    this.status = "FULLY_AUTHORIZED_CBS_SHADOW_RELEASED";
    this.cbsShadowReleased = true;
    this.auditEventChain.push({
      action: "KEY2_CHECKER_AUTHORIZATION_EXECUTED",
      signer: this.checkerSigner,
      timestamp: this.checkerSignTime
    });
  }

  reset() {
    this.makerSigned = false;
    this.checkerSigned = false;
    this.makerSignTime = null;
    this.checkerSignTime = null;
    this.cbsShadowReleased = false;
    this.status = "AWAITING_KEY1_MAKER_SIGNATURE";
    this.auditEventChain = [];
  }

  toJSON() {
    return {
      ticketId: this.ticketId,
      ruleIdentifier: this.ruleIdentifier,
      circularReference: this.circularReference,
      status: this.status,
      makerSigned: this.makerSigned,
      checkerSigned: this.checkerSigned,
      makerSignTime: this.makerSignTime,
      checkerSignTime: this.checkerSignTime,
      makerSigner: this.makerSigner,
      checkerSigner: this.checkerSigner,
      cbsShadowReleased: this.cbsShadowReleased,
      history: this.auditEventChain
    };
  }
}

module.exports = { GovernanceTicket };


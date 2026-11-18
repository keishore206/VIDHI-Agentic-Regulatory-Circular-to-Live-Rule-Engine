/**
 * ==============================================================================
 * VIDHI Backend Engine — Dual-Key Maker-Checker Governance Service
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

const { GovernanceTicket } = require('../models/GovernanceTicket');
const { generateDigitalSignature } = require('../utils/cryptoHelper');

let activeTicket = new GovernanceTicket("TICKET-KYC-2026-001");

function getGovernanceStatus() {
  return activeTicket.toJSON();
}

function executeSignoff(role, key) {
  const isMaker = role === 'maker' || key === 1;
  const isChecker = role === 'checker' || key === 2;

  if (isMaker) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " IST";
    activeTicket.signMaker(timestamp);
    const signature = generateDigitalSignature("K. S. Narayanan", "Compliance Officer / Employer", activeTicket.ticketId);
    return {
      success: true,
      action: "MAKER_SIGNOFF_EXECUTED",
      signer: "K. S. Narayanan",
      role: "Compliance Officer / Employer",
      key: 1,
      timestamp,
      rulesHighlighted: true,
      signatureToken: signature.signatureToken,
      ticket: activeTicket.toJSON()
    };
  }

  if (isChecker) {
    if (!activeTicket.makerSigned) {
      throw new Error("Governance Protocol Violation: Key 1 Maker signature must be executed before Checker can release to CBS.");
    }
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " IST";
    activeTicket.signChecker(timestamp);
    const signature = generateDigitalSignature("Keishore G", "System Administrator", activeTicket.ticketId);
    return {
      success: true,
      action: "CHECKER_SIGNOFF_EXECUTED",
      signer: "Keishore G",
      role: "System Administrator",
      key: 2,
      timestamp,
      cbsDeployed: true,
      deploymentMode: "CBS_SHADOW_ENGINE",
      signatureToken: signature.signatureToken,
      ticket: activeTicket.toJSON()
    };
  }

  throw new Error("Invalid signing role or key identifier.");
}

function resetGovernance() {
  activeTicket.reset();
  return { success: true, ticket: activeTicket.toJSON() };
}

module.exports = {
  getGovernanceStatus,
  executeSignoff,
  resetGovernance
};

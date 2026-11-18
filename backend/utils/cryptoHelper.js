/**
 * ==============================================================================
 * VIDHI Backend Engine — Cryptographic Provenance & Hash Chain Utilities
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

const crypto = require('crypto');

/**
 * Computes SHA-256 hash of an object or string
 */
function computeSha256(data) {
  const serialized = typeof data === 'string' ? data : JSON.stringify(data);
  return crypto.createHash('sha256').update(serialized).digest('hex');
}

/**
 * Generates an immutable hash-chained audit block
 */
function createAuditBlock(stepIndex, eventType, payload, previousHash = "0000000000000000000000000000000000000000000000000000000000000000") {
  const timestamp = new Date().toISOString();
  const blockHeader = {
    stepIndex,
    eventType,
    timestamp,
    previousHash
  };
  const blockHash = computeSha256({ header: blockHeader, payload });
  return {
    ...blockHeader,
    payload,
    blockHash
  };
}

/**
 * Simulates digital cryptographic signature generation for Maker/Checker
 */
function generateDigitalSignature(signerName, role, ticketId, privateKeySalt = "VIDHI_BANK_SECURE_2026") {
  const timestamp = new Date().toISOString();
  const message = `${signerName}:${role}:${ticketId}:${timestamp}:${privateKeySalt}`;
  const signatureHash = crypto.createHmac('sha256', privateKeySalt).update(message).digest('hex');
  return {
    signer: signerName,
    role,
    ticketId,
    timestamp,
    algorithm: "HMAC-SHA256 / Dual-Key Institutional WORM",
    signatureToken: `SIG-DIGITAL-${signatureHash.substring(0, 24).toUpperCase()}`
  };
}

module.exports = {
  computeSha256,
  createAuditBlock,
  generateDigitalSignature
};

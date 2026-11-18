/**
 * ==============================================================================
 * VIDHI Backend Engine — Golden Thread WORM Hash-Chained Audit Ledger Model
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

const { computeSha256 } = require('../utils/cryptoHelper');

class GoldenThreadLedger {
  constructor() {
    this.chain = [];
    this._initializeGenesis();
  }

  _initializeGenesis() {
    const genesisBlock = {
      index: 0,
      timestamp: "2026-11-01T00:00:00.000Z",
      type: "GENESIS_ROOT",
      data: {
        system: "VIDHI CRCE v4.2",
        authority: "Reserve Bank of India Master Directions",
        team: "Codexx (Keishore G & Rohit V)"
      },
      previousHash: "0",
      hash: computeSha256("GENESIS_BLOCK_VIDHI_2026")
    };
    this.chain.push(genesisBlock);
  }

  append(type, data) {
    const previousBlock = this.chain[this.chain.length - 1];
    const index = this.chain.length;
    const timestamp = new Date().toISOString();
    const payload = { index, timestamp, type, data, previousHash: previousBlock.hash };
    const hash = computeSha256(payload);

    const block = {
      ...payload,
      hash
    };
    this.chain.push(block);
    return block;
  }

  getHistory() {
    return [...this.chain];
  }
}

module.exports = { GoldenThreadLedger };

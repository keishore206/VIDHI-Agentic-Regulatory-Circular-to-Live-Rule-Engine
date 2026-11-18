/**
 * VIDHI - Institutional Banking Core API
 * Controller: ObligationController
 * Manages statutory obligation extraction, CRCE DSL compilation, policy gap audit, and Neo4j knowledge graph.
 */

const { getExtractedObligations } = require('../services/obligationExtractorService');
const { compileCircularToDsl } = require('../services/crceCompilerService');
const { auditPolicyAlignment } = require('../services/policyAuditorService');
const { getKnowledgeGraph } = require('../services/knowledgeGraphService');

class ObligationController {
  /**
   * Get all extracted statutory obligations for the current circular
   */
  static async getObligations(req, res) {
    try {
      const isUploaded = req.query.isUploaded !== 'false';
      const obligations = getExtractedObligations(isUploaded);

      return res.status(200).json({
        status: 'SUCCESS',
        count: obligations.length,
        circularRef: "DEMO/KYC/2026/001",
        data: obligations
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_OBLIGATION_EXTRACTION',
        message: err.message
      });
    }
  }

  /**
   * Compile extracted obligations into typed CBS DSL rules via CRCE engine
   */
  static async compileRules(req, res) {
    try {
      const { circularRef } = req.body || {};
      const compiled = compileCircularToDsl(circularRef || "DEMO/KYC/2026/001");

      return res.status(200).json({
        status: 'SUCCESS',
        message: 'Circular successfully compiled into typed Core Banking DSL rules with strict Clause 3.3 negative constraints.',
        data: compiled
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_CRCE_COMPILATION',
        message: err.message
      });
    }
  }

  /**
   * Audit institutional policy document against extracted circular obligations
   */
  static async auditPolicyGaps(req, res) {
    try {
      const audit = auditPolicyAlignment("DEMO/KYC/2026/001");
      return res.status(200).json({
        status: 'SUCCESS',
        data: audit
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_POLICY_AUDIT',
        message: err.message
      });
    }
  }

  /**
   * Get Neo4j Labeled Property Graph (LPG) representation
   */
  static async getKnowledgeGraph(req, res) {
    try {
      const graph = getKnowledgeGraph();
      return res.status(200).json({
        status: 'SUCCESS',
        data: graph
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_GRAPH_RETRIEVAL',
        message: err.message
      });
    }
  }
}

module.exports = ObligationController;


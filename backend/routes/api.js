/**
 * VIDHI - Institutional Banking Core API
 * Master Route Aggregator
 * Connects controllers, RBAC middlewares, audit chains, and A2A service endpoints.
 */

const AuthController = require('../controllers/authController');
const CircularController = require('../controllers/circularController');
const ObligationController = require('../controllers/obligationController');
const SimulationController = require('../controllers/simulationController');
const GovernanceController = require('../controllers/governanceController');

const { requireAuth } = require('../middleware/authMiddleware');
const { requireRbac } = require('../middleware/rbacMiddleware');
const { auditRequest } = require('../middleware/auditMiddleware');
const { AGENT_CARDS } = require('../config/agentCards');

/**
 * Lightweight Institutional Router compatible with Express and native HTTP dispatcher
 */
class ApiRouter {
  constructor() {
    this.routes = [];
  }

  get(path, ...handlers) {
    this.routes.push({ method: 'GET', path, handlers });
  }

  post(path, ...handlers) {
    this.routes.push({ method: 'POST', path, handlers });
  }

  delete(path, ...handlers) {
    this.routes.push({ method: 'DELETE', path, handlers });
  }
}

const router = new ApiRouter();

// ==========================================
// 1. Institutional Identity & Authentication
// ==========================================
router.post('/api/auth/login', auditRequest, AuthController.login);
router.get('/api/auth/profile', requireAuth, AuthController.getProfile);
router.post('/api/auth/logout', AuthController.logout);

// ==========================================
// 2. Regulatory Circular Ingestion & Intake
// ==========================================
router.post('/api/circular/ingest', auditRequest, CircularController.ingestCircular);
router.get('/api/circular/status/:circularId', CircularController.getCircularStatus);
router.get('/api/circular/list', CircularController.listCirculars);

// ==========================================
// 3. Obligations, CRCE Compiler & Knowledge Graph
// ==========================================
router.get('/api/obligations', ObligationController.getObligations);
router.post('/api/obligations/compile', auditRequest, ObligationController.compileRules);
router.get('/api/obligations/policy-gap', ObligationController.auditPolicyGaps);
router.get('/api/knowledge-graph', ObligationController.getKnowledgeGraph);

// ==========================================
// 4. Ledger Simulation, Impact Analysis & Boundary Tests
// ==========================================
router.post('/api/simulation/backtest', auditRequest, SimulationController.runBacktest);
router.get('/api/simulation/impact', SimulationController.getImpactAnalysis);
router.get('/api/simulation/boundary-tests', SimulationController.getBoundaryTests);

// ==========================================
// 5. Dual-Key Governance & Golden Thread Audit
// ==========================================
router.get('/api/governance/status', GovernanceController.getStatus);
router.post('/api/governance/maker-signoff', auditRequest, GovernanceController.submitMakerSignoff);
router.post('/api/governance/checker-signoff', auditRequest, GovernanceController.submitCheckerSignoff);
router.post('/api/governance/rollback', auditRequest, GovernanceController.triggerRollback);
router.post('/api/governance/reset', auditRequest, GovernanceController.resetTicket);
router.get('/api/governance/golden-thread', GovernanceController.getGoldenThread);

// ==========================================
// 6. A2A Multi-Agent Roster & Agent Cards
// ==========================================
router.get('/api/agents', (req, res) => {
  return res.status(200).json({
    status: 'SUCCESS',
    count: AGENT_CARDS.length,
    protocol: 'A2A (Agent-to-Agent v1.0 JSON-RPC / MCP)',
    agents: AGENT_CARDS
  });
});

module.exports = router;

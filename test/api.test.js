/**
 * ==============================================================================
 * VIDHI — Automated Integration Test Suite
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 * Tests the complete Regulatory Compilation & Dual-Key Governance Pipeline:
 * 1. Health check & 7-Agent A2A Roster
 * 2. Institutional Authentication (Strict 2-Role Gate)
 * 3. Document Ingestion Scope Validation (Authorized vs Unauthorized PDFs)
 * 4. Extracted Obligations Registry (5 Clauses)
 * 5. Negative Constraint Guardrail Enforcement (Clause 3.3)
 * 6. Dual-Key Maker-Checker Sequential Authorization
 * ==============================================================================
 */

const http = require('http');

const PORT = 5001; // Run test server on alternate port to avoid collision
process.env.PORT = PORT;

// Start server in background for testing
require('../server.js');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const reqOptions = {
      hostname: 'localhost',
      port: PORT,
      path: options.path,
      method: options.method || 'GET',
      headers: { ...defaultHeaders, ...(options.headers || {}) }
    };

    const req = http.request(reqOptions, res => {
      let body = '';
      res.on('data', chunk => body += chunk.toString());
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch(e) {
          resolve({ status: res.statusCode, headers: res.headers, body });
        }
      });
    });

    req.on('error', err => reject(err));
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`  ✓ ${message}`);
  }
}

async function runTests() {
  console.log('\n================================================================');
  console.log('🏛️  VIDHI BACKEND AUTOMATED TEST SUITE (Team Codexx)');
  console.log('================================================================\n');

  // Wait 600ms for server to bind
  await new Promise(r => setTimeout(r, 600));

  // Test 1: Health & Agent Roster
  console.log('Test Suite 1: System Health & Multi-Agent Protocol');
  const healthRes = await request({ path: '/api/health' });
  assert(healthRes.status === 200, 'Health endpoint responds with HTTP 200');
  assert(healthRes.body.status === 'UP', 'Service status is UP');
  assert(healthRes.body.agentsOnline === 7, '7 Specialized Agents online over A2A');

  const rosterRes = await request({ path: '/api/agents/roster' });
  assert(rosterRes.status === 200, 'Agent roster endpoint responds with HTTP 200');
  assert(rosterRes.body.agents.length === 7, 'All 7 Agent Cards present in discovery registry');

  // Test 2: Institutional Authentication Gate
  console.log('\nTest Suite 2: Institutional Authentication (Strict 2-Role Gate)');
  const adminLogin = await request({ path: '/api/auth/login', method: 'POST' }, {
    email: 'admin@abcdemobank.com',
    password: 'admin'
  });
  assert(adminLogin.status === 200 && adminLogin.body.success, 'Admin login succeeds with simple demo credential');
  assert(adminLogin.body.user.roleKey === 'admin', 'Admin roleKey verified');

  const empLogin = await request({ path: '/api/auth/login', method: 'POST' }, {
    email: 'k.narayanan@abcdemobank.com',
    password: '1234'
  });
  assert(empLogin.status === 200 && empLogin.body.success, 'Employer login succeeds with credential 1234');
  assert(empLogin.body.user.roleKey === 'employee', 'Compliance Officer roleKey verified');

  const rogueLogin = await request({ path: '/api/auth/login', method: 'POST' }, {
    email: 'hacker@external.com',
    password: 'password123'
  });
  assert(rogueLogin.status === 401, 'Unauthorized external email is strictly blocked with HTTP 401');

  // Test 3: Document Ingestion Scope Guard
  console.log('\nTest Suite 3: Document Ingestion Scope Validation');
  const badPdf = await request({ path: '/api/circulars/upload', method: 'POST' }, {
    fileName: 'Unrelated_Random_Doc.pdf'
  });
  assert(badPdf.status === 422, 'Non-KYC PDF is rejected with HTTP 422 Unprocessable Entity');
  assert(badPdf.body.authorized === false, 'Rejection metadata returned properly');

  const badObligations = await request({ path: '/api/obligations' });
  assert(badObligations.body.total === 0, 'Zero obligations generated for unauthorized document');

  const validPdf = await request({ path: '/api/circulars/upload', method: 'POST' }, {
    fileName: 'VIDHI_Illustrative_KYC_Circular_Test.pdf'
  });
  assert(validPdf.status === 200, 'Authorized KYC Circular accepted with HTTP 200');
  assert(validPdf.body.extractedCount === 5, '5 Obligations extracted and dispatched');

  // Test 4: Extracted Obligations & Clause 3.3 Negative Constraint
  console.log('\nTest Suite 4: Clause Breakdown & Negative Constraint Verification');
  const goodObligations = await request({ path: '/api/obligations' });
  assert(goodObligations.body.total === 5, '5 obligations available in Compliance Register');

  const clause33 = goodObligations.body.obligations.find(o => o.clause === '3.3');
  assert(clause33 && clause33.guardrail === true, 'Clause 3.3 negative constraint is explicitly marked as Guardrail');

  const backtest = await request({ path: '/api/backtest/simulate' });
  assert(backtest.body.wrongfulAccountClosures === 0, 'Historical replay verified: 0 wrongful account closures');
  assert(backtest.body.clause33Satisfied === true, 'Clause 3.3 guardrail 100% satisfied');

  // Test 5: Dual-Key Governance Workflow
  console.log('\nTest Suite 5: Dual-Key Governance (Sequential Maker-Checker)');
  // Attempt checker sign without maker first
  const prematureChecker = await request({ path: '/api/governance/sign', method: 'POST' }, { key: 2 });
  assert(prematureChecker.status === 400, 'Checker signing blocked before Maker signature (Key 1)');

  // Maker signs
  const makerSign = await request({ path: '/api/governance/sign', method: 'POST' }, { key: 1 });
  assert(makerSign.status === 200 && makerSign.body.rulesHighlighted === true, 'Maker signs Key 1 and rules are flagged as highlighted');

  // Checker signs
  const checkerSign = await request({ path: '/api/governance/sign', method: 'POST' }, { key: 2 });
  assert(checkerSign.status === 200 && checkerSign.body.cbsDeployed === true, 'Checker signs Key 2 and releases rule to CBS Shadow Engine');

  console.log('\n================================================================');
  console.log('✅  ALL INTEGRATION TESTS PASSED (100% GREEN)');
  console.log('================================================================\n');

  process.exit(0);
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});


/**
 * ==============================================================================
 * VIDHI Backend Engine — Forensic Audit Request Interceptor Middleware
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

const { computeSha256 } = require('../utils/cryptoHelper');

const liveAuditEvents = [];

function auditRequestInterceptor(req, res, next) {
  const method = req.method;
  const path = req.url;
  const userEmail = (req.user && req.user.email) || 'anonymous@bank';
  const timestamp = new Date().toISOString();

  // Only audit mutations (POST, PUT, DELETE)
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    const eventRecord = {
      eventId: `AUDIT-EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp,
      method,
      path,
      user: userEmail,
      eventHash: computeSha256(`${method}:${path}:${userEmail}:${timestamp}`)
    };
    liveAuditEvents.push(eventRecord);
    if (liveAuditEvents.length > 100) liveAuditEvents.shift();
  }

  if (next) next();
}

function getLiveAuditEvents() {
  return [...liveAuditEvents];
}

module.exports = {
  auditRequestInterceptor,
  getLiveAuditEvents
};


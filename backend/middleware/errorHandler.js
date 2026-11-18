/**
 * ==============================================================================
 * VIDHI Backend Engine — Centralized Institutional Banking Error Handler
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

function errorHandler(err, req, res, next) {
  console.error('[VIDHI SERVER ERROR]', err.stack || err.message);

  const statusCode = err.statusCode || (err.message.includes('Access Denied') ? 401 : 500);

  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  res.end(JSON.stringify({
    success: false,
    error: err.message || 'Internal Regulatory Gateway Server Error',
    statusCode,
    timestamp: new Date().toISOString(),
    traceId: `ERR-TRACE-${Date.now()}`
  }, null, 2));
}

module.exports = { errorHandler };

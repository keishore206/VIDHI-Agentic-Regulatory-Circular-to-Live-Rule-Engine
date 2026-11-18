/**
 * ==============================================================================
 * VIDHI Backend Engine — Role-Based Access Control (RBAC) Middleware
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

function requirePermission(requiredPermission) {
  return function(req, res, next) {
    const user = req.user;
    if (!user) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Unauthorized: Active user session required." }));
      return;
    }

    if (!user.permissions || !user.permissions.includes(requiredPermission)) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: `Forbidden: User '${user.email}' lacks required institutional clearance '${requiredPermission}'.`
      }));
      return;
    }

    if (next) next();
  };
}

module.exports = { requirePermission };


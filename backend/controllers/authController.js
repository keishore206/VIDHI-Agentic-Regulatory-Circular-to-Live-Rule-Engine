/**
 * VIDHI - Institutional Banking Core API
 * Controller: AuthController
 * Handles institutional authentication and session validation for Maker & Checker roles.
 */

const { AUTH_USERS } = require('../config/constants');
const { generateSessionToken } = require('../utils/cryptoHelper');

class AuthController {
  /**
   * Institutional User Login
   * Accepts Maker (Compliance Officer) and Checker (Chief Risk Officer) credentials.
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body || {};

      if (!email || !password) {
        return res.status(400).json({
          status: 'ERROR',
          code: 'ERR_MISSING_CREDENTIALS',
          message: 'Corporate email and clearance password are required.'
        });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const user = AUTH_USERS[normalizedEmail];

      if (!user || user.password !== password) {
        return res.status(401).json({
          status: 'ERROR',
          code: 'ERR_INVALID_AUTH',
          message: 'Invalid banking credentials or unauthorized institutional role.'
        });
      }

      const token = generateSessionToken(user.email, user.role);

      return res.status(200).json({
        status: 'SUCCESS',
        message: 'Institutional identity authenticated successfully.',
        data: {
          user: {
            email: user.email,
            name: user.name,
            role: user.role,
            designation: user.designation,
            department: user.department,
            clearance: user.clearance,
            token
          }
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_AUTH_INTERNAL',
        message: err.message
      });
    }
  }

  /**
   * Get Current Session Clearance Profile
   */
  static async getProfile(req, res) {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        status: 'ERROR',
        code: 'ERR_UNAUTHORIZED',
        message: 'No active session clearance found.'
      });
    }

    return res.status(200).json({
      status: 'SUCCESS',
      data: {
        profile: {
          email: user.email,
          name: user.name,
          role: user.role,
          clearance: user.clearance,
          department: user.department,
          designation: user.designation
        }
      }
    });
  }

  /**
   * Terminate Institutional Session
   */
  static async logout(req, res) {
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Institutional banking session revoked cleanly.'
    });
  }
}

module.exports = AuthController;

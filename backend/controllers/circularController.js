/**
 * VIDHI - Institutional Banking Core API
 * Controller: CircularController
 * Orchestrates circular ingestion, document verification, and cryptographic sealing.
 */

const IngestionService = require('../services/ingestionService');
const ObligationExtractorService = require('../services/obligationExtractorService');

class CircularController {
  /**
   * Ingest and verify regulatory circular
   */
  static async ingestCircular(req, res) {
    try {
      const { fileName, textContent, fileSize, mimeType } = req.body || {};

      if (!fileName) {
        return res.status(400).json({
          status: 'ERROR',
          code: 'ERR_NO_FILE',
          message: 'Regulatory document payload must include fileName.'
        });
      }

      // Execute ingestion and cryptographic validation
      const intakeResult = IngestionService.ingestCircular({
        fileName,
        textContent,
        fileSize,
        mimeType
      });

      if (!intakeResult.valid) {
        return res.status(422).json({
          status: 'REJECTED',
          code: 'ERR_CIRCULAR_REJECTED',
          message: intakeResult.reason,
          fileName
        });
      }

      // Trigger deterministic obligation extraction
      const obligations = ObligationExtractorService.extractObligations(intakeResult.circularId);

      return res.status(200).json({
        status: 'SUCCESS',
        message: 'Circular verified and obligations mapped to banking ontology.',
        data: {
          intake: intakeResult,
          obligationCount: obligations.length,
          obligations
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_CIRCULAR_PROCESSING',
        message: err.message
      });
    }
  }

  /**
   * Get active circular status and metadata
   */
  static async getCircularStatus(req, res) {
    try {
      const { circularId } = req.params;
      const status = IngestionService.getCircularStatus(circularId);

      if (!status) {
        return res.status(404).json({
          status: 'ERROR',
          code: 'ERR_NOT_FOUND',
          message: `Regulatory circular ${circularId} not found in institutional intake buffer.`
        });
      }

      return res.status(200).json({
        status: 'SUCCESS',
        data: status
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_INTERNAL',
        message: err.message
      });
    }
  }

  /**
   * List all ingested regulatory circulars in institutional archive
   */
  static async listCirculars(req, res) {
    try {
      const circulars = IngestionService.listCirculars();
      return res.status(200).json({
        status: 'SUCCESS',
        count: circulars.length,
        data: circulars
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERROR',
        code: 'ERR_INTERNAL',
        message: err.message
      });
    }
  }
}

module.exports = CircularController;

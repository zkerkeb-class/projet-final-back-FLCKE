import express from 'express';
import verifyToken from '../middlewares/AuthMiddleware.js';
import { generateLeasePdf } from '../controllers/contratController.js';
const router = express.Router();
/**
 * @swagger
 * /api/generate-contrat/{id}:
 *   get:
 *     summary: Générer un PDF de contrat de bail
 *     tags: [Contrat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF généré
 */
// Route pour générer un contrat de bail
router.get('/:id', verifyToken, generateLeasePdf); // Générer un contrat de bail

export default router;
import { getOwnerDashboardStats } from "../controllers/statController.js";
import express from "express"
const router = express.Router()
/**
 * @swagger
 * /api/stats/{id}:
 *   get:
 *     summary: Récupérer les statistiques du propriétaire
 *     tags: [Stat]
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
 *         description: Statistiques récupérées
 */
router.get("/:id", getOwnerDashboardStats)

export default router;
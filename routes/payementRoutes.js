import express from 'express'
import { addPayement, getAllPayement, getAllPayementByOwner, getAllPayementByUser, updatePayement } from '../controllers/payementController.js';
import verifyToken from '../middlewares/AuthMiddleware.js';
const router = express.Router();
/**
 * @swagger
 * /api/payement:
 *   get:
 *     summary: Récupérer tous les paiements
 *     tags: [Payement]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des paiements
 */
/**
 * @swagger
 * /api/payement:
 *   post:
 *     summary: Ajouter un paiement
 *     tags: [Payement]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payement'
 *     responses:
 *       201:
 *         description: Paiement créé
 */
/**
 * @swagger
 * /api/payement/{id}:
 *   get:
 *     summary: Récupérer les paiements d'un utilisateur
 *     tags: [Payement]
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
 *         description: Paiements trouvés
 */
/**
 * @swagger
 * /api/payement/{id}:
 *   put:
 *     summary: Modifier un paiement
 *     tags: [Payement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payement'
 *     responses:
 *       200:
 *         description: Paiement modifié
 */
/**
 * @swagger
 * /api/payement/owner/{id}:
 *   get:
 *     summary: Récupérer tous les paiements liés à un propriétaire
 *     tags: [Payement]
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
 *         description: Paiements du propriétaire trouvés
 */

/**
 * @swagger
 * /api/payement/last/{id}/{limit}:
 *   get:
 *     summary: Récupérer les derniers paiements d'un utilisateur (limite personnalisée)
 *     tags: [Payement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: limit
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Derniers paiements trouvés
 */
router.post("/", verifyToken, addPayement);
router.get("/", verifyToken, getAllPayement);
router.get("/:id", verifyToken, getAllPayementByUser);
router.get("/owner/:id", verifyToken, getAllPayementByOwner);
router.get("/last/:id/:limit", verifyToken, getAllPayementByUser)
router.put("/:id", verifyToken, updatePayement);

export default router;
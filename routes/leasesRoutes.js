import express from "express";
import verifyToken from "../middlewares/AuthMiddleware.js";
import leasesController from "../controllers/leasesController.js";
const router = express.Router();
/**
 * @swagger
 * /api/leases:
 *   get:
 *     summary: Récupérer tous les baux
 *     tags: [Lease]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des baux
 */
/**
 * @swagger
 * /api/leases:
 *   post:
 *     summary: Ajouter un bail
 *     tags: [Lease]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lease'
 *     responses:
 *       201:
 *         description: Bail créé
 */
/**
 * @swagger
 * /api/leases/{id}:
 *   get:
 *     summary: Récupérer un bail par ID
 *     tags: [Lease]
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
 *         description: Bail trouvé
 */
/**
 * @swagger
 * /api/leases/{id}:
 *   put:
 *     summary: Modifier un bail
 *     tags: [Lease]
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
 *             $ref: '#/components/schemas/Lease'
 *     responses:
 *       200:
 *         description: Bail modifié
 */
/**
 * @swagger
 * /api/leases/{id}:
 *   delete:
 *     summary: Supprimer un bail
 *     tags: [Lease]
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
 *         description: Bail supprimé
 */
/**
 * @swagger
 * /api/leases/getAll/{id}:
 *   get:
 *     summary: Récupérer tous les baux d'un utilisateur
 *     tags: [Lease]
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
 *         description: Liste des baux de l'utilisateur
 */

/**
 * @swagger
 * /api/leases/getAllByProperties/{id}:
 *   get:
 *     summary: Récupérer tous les baux d'une propriété
 *     tags: [Lease]
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
 *         description: Liste des baux de la propriété
 */

/**
 * @swagger
 * /api/leases/getAllByOwner/{id}:
 *   get:
 *     summary: Récupérer tous les baux d'un propriétaire
 *     tags: [Lease]
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
 *         description: Liste des baux du propriétaire
 */

/**
 * @swagger
 * /api/leases/suspend/{id}:
 *   put:
 *     summary: Suspendre un bail par ID
 *     tags: [Lease]
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
 *         description: Bail suspendu
 */
// Route pour ajouter un bail
router.post("/", verifyToken, leasesController.addLease); // Ajouter un bail
router.get("/getAll/:id", verifyToken, leasesController.getAllLeasesByUser); // Récupérer tous les baux d'un utilisateur
router.get("/getAllByProperties/:id", verifyToken, leasesController.getAllLeasesByProperties); // Récupérer tous les baux d'une propriété
router.get("/getAllByOwner/:id", verifyToken, leasesController.getAllLeasesByOwner); // Récupérer tous les baux d'un propriétaire
router.get("/:id", verifyToken, leasesController.getLeaseById); // Récupérer un bail par ID
router.get("/", verifyToken, leasesController.getAllLeases); // Récupérer tous les baux
router.delete("/:id", verifyToken, leasesController.deleteLease); // Supprimer un bail par ID
router.put("/:id", verifyToken, leasesController.updateLease); // Mettre à jour un bail par ID
router.put("/suspend/:id", verifyToken, leasesController.suspendLease); // Suspendre un bail par ID
export default router;
import express from "express";
import verifyToken from "../middlewares/AuthMiddleware.js";
import propertiesController from "../controllers/propertiesController.js";
const router = express.Router();
/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Récupérer toutes les propriétés
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des propriétés
 */

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Ajouter une propriété
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       201:
 *         description: Propriété créée
 */
/**
 * @swagger
 * /api/properties/getAll/{id}:
 *   get:
 *     summary: Récupérer toutes les propriétés d'un utilisateur
 *     tags: [Property]
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
 *         description: Liste des propriétés de l'utilisateur
 */

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Récupérer une propriété par ID
 *     tags: [Property]
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
 *         description: Propriété trouvée
 */

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Supprimer une propriété par ID
 *     tags: [Property]
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
 *         description: Propriété supprimée
 */

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Mettre à jour une propriété par ID
 *     tags: [Property]
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
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: Propriété mise à jour
 */
// Route pour ajouter une propriété
router.post("/", verifyToken, propertiesController.addProperty); // Ajouter une propriété
router.get("/getAll/:id", verifyToken, propertiesController.getAllPropertiesByUser); // Récupérer toutes les propriétés d'un utilisateur
router.get("/:id", verifyToken, propertiesController.getPropertyById); // Récupérer une propriété par ID    
router.get("/", verifyToken, propertiesController.getAllProperties); // Récupérer toutes les propriétés
router.delete("/:id", verifyToken, propertiesController.deleteProperty); // Supprimer une propriété par ID
router.put("/:id", verifyToken, propertiesController.updateProperty); // Mettre à jour une propriété par ID
export default router;
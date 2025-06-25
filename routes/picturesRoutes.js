
import express from "express";
import picturesController from "../controllers/picturesController.js";
import verifyToken from "../middlewares/AuthMiddleware.js";
const router = express.Router();
/**
 * @swagger
 * /api/picture:
 *   post:
 *     summary: Uploader une photo utilisateur
 *     tags: [Picture]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Photo uploadée
 */
/**
 * @swagger
 * /api/picture/{id}:
 *   get:
 *     summary: Récupérer la photo d'un utilisateur
 *     tags: [Picture]
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
 *         description: Photo trouvée
 */

router.post("/", verifyToken, picturesController.uploadUserPicture)
router.get("/:id", verifyToken, picturesController.getPicture)

export default router;
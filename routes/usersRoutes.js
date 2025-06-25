//const usersController = require("../controllers/usersController");
//const express = require("express");
//const { verifyToken } = require("../middlewares/AuthMiddleware");
import express from "express";
import verifyToken from "../middlewares/AuthMiddleware.js";
import usersController from "../controllers/usersController.js"
const router = express.Router();

// Route pour ajouter un utilisateur
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [User]
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
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     tags: [User]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [User]
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
 *         description: Utilisateur supprimé
 */
router.get("/:id", verifyToken, usersController.getUserById); // Récupérer un utilisateur par ID
router.get("/", verifyToken, usersController.getAllUsers); // Récupérer tous les utilisateurs
router.delete("/:id", verifyToken, usersController.deleteUser); // Supprimer un utilisateur par ID
router.put("/:id", verifyToken, usersController.updateUser); // Mettre à jour un utilisateur par ID

export default router;
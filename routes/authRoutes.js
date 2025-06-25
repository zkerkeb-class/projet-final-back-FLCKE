/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: API pour l'authentification des utilisateurs
 */

import express from "express";
import { addUser, loginUser, requestPasswordReset, resetPassword } from "../controllers/authController.js";
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       description: Informations de l'utilisateur pour l'inscription
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: L'utilisateur existe déjà
 *       500:
 *         description: Erreur serveur interne
 */
router.post('/register', addUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       description: Identifiants de l'utilisateur pour la connexion
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentification réussie
 *       400:
 *         description: Utilisateur non trouvé
 *       401:
 *         description: Mot de passe incorrect
 *       500:
 *         description: Erreur serveur interne
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /request-password-reset:
 *   post:
 *     summary: Demande de réinitialisation de mot de passe
 *     tags: [Auth]
 *     requestBody:
 *       description: Email de l'utilisateur pour la réinitialisation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email envoyé pour réinitialisation
 *       400:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/request-password-reset', requestPasswordReset);

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Réinitialisation du mot de passe de l'utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       description: Token de réinitialisation et nouveau mot de passe
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès
 *       400:
 *         description: Le lien de réinitialisation est invalide ou expiré
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/reset-password', resetPassword);

export default router;

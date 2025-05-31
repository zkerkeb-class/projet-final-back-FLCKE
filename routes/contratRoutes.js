import express from 'express';
import verifyToken from '../middlewares/AuthMiddleware.js';
import contratController from '../controllers/contratController.js';
const router = express.Router();

// Route pour générer un contrat de bail
router.get('/:id', verifyToken, contratController.generateLeasePdf); // Générer un contrat de bail

export default router;
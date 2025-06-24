import express from 'express';
import verifyToken from '../middlewares/AuthMiddleware.js';
import { generateLeasePdf } from '../controllers/contratController.js';
const router = express.Router();

// Route pour générer un contrat de bail
router.get('/:id', verifyToken, generateLeasePdf); // Générer un contrat de bail

export default router;
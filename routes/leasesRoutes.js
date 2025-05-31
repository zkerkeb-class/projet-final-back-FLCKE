import express from "express";
import verifyToken from "../middlewares/AuthMiddleware.js";
import leasesController from "../controllers/leasesController.js";
const router = express.Router();

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
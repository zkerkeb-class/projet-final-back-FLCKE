import express from "express";
import verifyToken from "../middlewares/AuthMiddleware.js";
import propertiesController from "../controllers/propertiesController.js";
const router = express.Router();

// Route pour ajouter une propriété
router.post("/", verifyToken, propertiesController.addProperty); // Ajouter une propriété
router.get("/getAll/:id", verifyToken, propertiesController.getAllPropertiesByUser); // Récupérer toutes les propriétés d'un utilisateur
router.get("/:id", verifyToken, propertiesController.getPropertyById); // Récupérer une propriété par ID    
router.get("/", verifyToken, propertiesController.getAllProperties); // Récupérer toutes les propriétés
router.delete("/:id", verifyToken, propertiesController.deleteProperty); // Supprimer une propriété par ID
router.put("/:id", verifyToken, propertiesController.updateProperty); // Mettre à jour une propriété par ID
export default router;
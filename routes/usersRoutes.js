const usersController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/AuthMiddleware");

// Route pour ajouter un utilisateur
router.get("/:id", verifyToken, usersController.getUserById); // Récupérer un utilisateur par ID
router.get("/", verifyToken, usersController.getAllUsers); // Récupérer tous les utilisateurs
router.delete("/:id", verifyToken, usersController.deleteUser); // Supprimer un utilisateur par ID
router.put("/:id", verifyToken, usersController.updateUser); // Mettre à jour un utilisateur par ID

module.exports = router;
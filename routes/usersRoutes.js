//const usersController = require("../controllers/usersController");
//const express = require("express");
//const { verifyToken } = require("../middlewares/AuthMiddleware");
import express from "express";
import verifyToken from "../middlewares/AuthMiddleware.js";
import usersController from "../controllers/usersController.js"
const router = express.Router();

// Route pour ajouter un utilisateur
router.get("/:id", verifyToken, usersController.getUserById); // Récupérer un utilisateur par ID
router.get("/", verifyToken, usersController.getAllUsers); // Récupérer tous les utilisateurs
router.delete("/:id", verifyToken, usersController.deleteUser); // Supprimer un utilisateur par ID
router.put("/:id", verifyToken, usersController.updateUser); // Mettre à jour un utilisateur par ID

export default router;
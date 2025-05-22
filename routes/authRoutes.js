// routes/authRoutes.js
//const express = require('express');
//const authController = require('../controllers/authController');
import express from "express";
import authController from "../controllers/authController.js";
const router = express.Router();

router.post('/register', authController.addUser);
router.post('/login', authController.loginUser);

export default router;
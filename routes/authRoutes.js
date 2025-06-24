// routes/authRoutes.js
//const express = require('express');
//const authController = require('../controllers/authController');
import express from "express";
import { addUser, loginUser, requestPasswordReset, resetPassword } from "../controllers/authController.js";
const router = express.Router();

router.post('/register',addUser);
router.post('/login', loginUser);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
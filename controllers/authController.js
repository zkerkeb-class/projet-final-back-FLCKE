// const Users = require('../models/usersModel');
// const handleRequest = require('../utils/handleRequest');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

import Users from '../models/usersModel.js';
import handleRequest from '../utils/handleRequest.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/mailSender.js';

async function addUser(req, res) {
    // Ajout d'un nouvel utilisateur
    let { fullName, email, password, role, phone } = req.body;
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Users.find({ email: email });
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }
    try {

        password = await handleRequest.hashData(password); // Hash le mot de passe
    }
    catch (error) {
        console.error('Error checking existing user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    // Créer un nouvel utilisateur
    const newUser = await Users.create({ fullName, email, password, role, phone });
    newUser.save()
        .then((user) => {

            const userObj = user.toObject();
            delete userObj.password;
            // Ajoutez le token à l'utilisateur  
            res.status(201).json({ "token": token, userObj });

        })
        .catch(err => res.status(400).json({ error: err.message }));
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        // 1. Chercher l'utilisateur par email
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        // 2. Vérifier que le mot de passe est correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // 3. Générer un token JWT
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            phone: user.phone
        }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // 4. Préparer une réponse sans le hash
        const userObj = user.toObject();
        delete userObj.password;

        return res.status(200).json({ token, user: userObj });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
async function requestPasswordReset(req, res) {
    const { email } = req.body;

    // Vérifie si l'utilisateur existe
    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "Utilisateur non trouvé." });
    }

    // Génère un token d'activation valide pendant 1 heure
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Génère le lien de réinitialisation
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Envoie l'email avec le lien



    try {
        await sendMail({
            to: user.email,
            subject: 'Réinitialisation de mot de passe',
            html: `
                    <h3>Bonjour  Mr/Madame, ${user.fullName}</h3>
                    <p>Veuillez cliquer sur ce lien pour changer de mot de passe</p>
                    <a href=${resetLink}>réinstialiser le mot de passe</a>
                    <p>Merci de votre confiance !</p>
                `,

        });
        res.status(200).json({ message: 'Email envoyé avec succès pour réinitialiser le mot de passe.' });
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}
async function resetPassword(req, res) {
    let { token, password } = req.body;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findById(decoded.userId);
        if (!user) {
            return res.status(400).json({ error: 'Utilisateur introuvable' });
        }

        // Hache le nouveau mot de passe
        password = await handleRequest.hashData(password);

        // Sauvegarde le nouveau mot de passe
        user.password = password;
        await user.save();

        res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        console.error('Erreur de vérification du token :', error);
        res.status(400).json({ error: 'Le lien de réinitialisation est invalide ou expiré.' });
    }
}

// module.exports = {
//     addUser,
//     loginUser,
// };
export default { addUser, loginUser, requestPasswordReset, resetPassword }; 
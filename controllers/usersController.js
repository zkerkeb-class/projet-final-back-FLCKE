//const Users = require('../models/usersModel');
//const handleRequest = require('../utils/handleRequest');
import Users from '../models/usersModel.js';
import handleRequest from '../utils/handleRequest.js';
import { sendMail } from '../utils/mailSender.js';

async function getUserById(req, res) {
    // Récupérer un utilisateur par ID
    const userId = req.params.id;
    const user = await Users.findOne({ _id: userId });
    handleRequest.verifyDataNotFound(user, res);

}
async function getAllUsers(req, res) {
    // Récupérer tous les utilisateurs
    const users = await Users.find();
    handleRequest.verifyDataNotFound(users, res);
}
async function deleteUser(req, res) {
    // Récupérer un utilisateur par ID
    const userId = req.params.id;
    const user = await Users.deleteOne({ _id: userId });
    handleRequest.verifyDataNotFound(user, res);
}
async function updateUser(req, res) {
    // Récupérer un utilisateur par ID
    const userId = req.params.id;
    const user = await Users.updateOne({ _id: userId }, req.body);
    handleRequest.verifyDataNotFound(user, res);
}

async function addTenant(email, name) {
    // Ajout d'un nouvel utilisateur
    const password = await handleRequest.generatePassword(16);
    const passwordhashed = await handleRequest.hashData(password);
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Users.find({ email: email });
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Créer un nouvel utilisateur
    const newUser = await Users.create({ email, fullName: name, password: passwordhashed, role: "locataire" });
    newUser.save()
    sendMail({
        to: email,
        subject: 'Contrat de bail signé',
        html: `
            <h3>Bonjour  Mr/Madame, ${name}</h3>
            <p>Votre contrat de bail a en cours de création veuillez vous connecter et enregistrer vos information</p>
            <a href="http://localhost:5173/login">Se connecter</a>
            <p>Votre mot de passe temporaire est : ${password}</p>
            <p>Merci de votre confiance !</p>
        `,

    });
    const userObj = newUser.toObject();
    delete userObj.password;
    return userObj;
}
export default {
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    addTenant,
};
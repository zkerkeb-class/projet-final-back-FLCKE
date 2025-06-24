import Users from '../models/usersModel.js';
import handleRequest from '../utils/handleRequest.js';
import { sendMail } from '../utils/mailSender.js';

const getUserById = async (req, res) => {
    const { id: userId } = req.params;
    try {
        const user = await Users.findById(userId);
        return handleRequest.verifyDataNotFound(user, res);
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        return handleRequest.verifyDataNotFound(users, res);
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    const { id: userId } = req.params;
    try {
        const user = await Users.deleteOne({ _id: userId });
        return handleRequest.verifyDataNotFound(user, res);
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    const { id: userId } = req.params;
    try {
        const user = await Users.updateOne({ _id: userId }, req.body);
        return handleRequest.verifyDataNotFound(user, res);
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const addTenant = async (email, name) => {
    try {
        const password = await handleRequest.generatePassword(16);
        const passwordHashed = await handleRequest.hashData(password);

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await Users.find({ email });
        if (existingUser.length > 0) {
            throw new Error('User already exists');
        }

        // Créer un nouvel utilisateur
        const newUser = await Users.create({
            email,
            fullName: name,
            password: passwordHashed,
            role: 'locataire',
        });
        await newUser.save();

        // Envoyer l'email
        await sendMail({
            to: email,
            subject: 'Contrat de bail signé',
            html: `
                <h3>Bonjour Mr/Madame, ${name}</h3>
                <p>Votre contrat de bail est en cours de création. Veuillez vous connecter et enregistrer vos informations.</p>
                <a href="http://localhost:5173/login">Se connecter</a>
                <p>Votre mot de passe temporaire est : ${password}</p>
                <p>Merci de votre confiance !</p>
            `,
        });

        const userObj = newUser.toObject();
        delete userObj.password;
        return userObj;

    } catch (error) {
        console.error('Erreur lors de la création du locataire:', error);
        throw new Error('Error creating tenant');
    }
};

export default {
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    addTenant,
};

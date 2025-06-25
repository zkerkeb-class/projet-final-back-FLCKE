import Users from '../models/usersModel.js';
import handleRequest from '../utils/handleRequest.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/mailSender.js';

export const addUser = async (req, res) => {
    let { fullName, email, password, role, phone } = req.body;

    const existingUser = await Users.find({ email: email });
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        password = await handleRequest.hashData(password); // Hash le mot de passe
        const newUser = await Users.create({ fullName, email, password, role, phone });

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, fullName, role, phone },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const userObj = newUser.toObject();
        delete userObj.password;

        res.status(201).json({ token, user: userObj });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                phone: user.phone,
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({ token, user: userObj });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    try {
        await sendMail({
            to: user.email,
            subject: 'Réinitialisation de mot de passe',
            html: `
        <h3>Bonjour Mr/Madame ${user.fullName}</h3>
        <p>Veuillez cliquer sur ce lien pour changer de mot de passe :</p>
        <a href="${resetLink}">Réinitialiser le mot de passe</a>
        <p>Merci de votre confiance !</p>
      `,
        });

        res.status(200).json({ message: 'Email envoyé avec succès pour réinitialiser le mot de passe.' });
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

export const resetPassword = async (req, res) => {
    let { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findById(decoded.userId);
        if (!user) return res.status(400).json({ error: 'Utilisateur introuvable' });

        password = await handleRequest.hashData(password);
        user.password = password;
        await user.save();

        res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        console.error('Erreur de vérification du token :', error);
        res.status(400).json({ error: 'Le lien de réinitialisation est invalide ou expiré.' });
    }
};

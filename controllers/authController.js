const Users = require('../models/usersModel');
const handleRequest = require('../utils/handleRequest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function addUser(req, res) {
    // Ajout d'un nouvel utilisateur
    let { name, email, password} = req.body;
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Users.find({ email: email });
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }
    passwordHash = handleRequest.hashData(passwordHash); // Hash le mot de passe
    // Créer un nouvel utilisateur
    const newUser = await Users.create({ name, email, password});
    newUser.save()
        .then((user) => {
            // Créer un token JWT
            token = jwt.sign({
                id: user._id,
                email: user.email,
                name: user.name,
            }, process.env.JWT_SECRET, { expiresIn: '24h' }); // Remplacez 'votre_clé_secrète' par votre clé secrète

            // 4. Préparer une réponse sans le hash
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
            name: user.name,
        }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // 4. Préparer une réponse sans le hash
        const userObj = user.toObject();
        delete userObj.passwordHash;

        return res.status(200).json({ token, user: userObj });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    addUser,
    loginUser,
};
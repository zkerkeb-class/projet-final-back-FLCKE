//const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    token = token.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Vérifiez le token ici (par exemple, en le décodant ou en le validant)
    // Si le token est valide, passez au middleware suivant
    // Sinon, renvoyez une réponse d'erreur
    try {
        // Ici, vous pouvez ajouter la logique pour vérifier le token
        // Par exemple, si vous utilisez JWT, vous pouvez le décoder et vérifier sa validité
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Remplacez 'votre_clé_secrète' par votre clé secrète
        if (!decoded) {
            return res.status(403).json({ message: 'Forbidden token' });
        }
        next(); // Passez au middleware suivant
    } catch (error) {
        return res.status(403).json({ message: 'checking failled  ' });
    }
}
export default verifyToken;
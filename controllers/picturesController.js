import picturesModel from '../models/picturesModel.js';
import handleRequest from '../utils/handleRequest.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configurer le stockage Multer vers Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'GestLocal', // Nom du dossier sur Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
});

const upload = multer({ storage });
const uploadSingle = upload.single('file');

const uploadUserPicture = async (req, res) => {
    uploadSingle(req, res, async (err) => {
        if (err) {
            console.error('Erreur Multer :', err);
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Aucun fichier envoyé." });
        }

        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json({ error: "userId manquant." });
            }

            // Supprimer l'ancienne photo si besoin
            await picturesModel.deleteMany({ userId });

            const newPhoto = await picturesModel.create({
                userId,
                imageUrl: req.file.path,
            });

            res.status(200).json({ message: 'Photo uploadée avec succès', url: req.file.path });
        } catch (error) {
            console.error('Erreur serveur :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    });
};

const getPicture = async (req, res) => {
    const { id } = req.params;
    try {
        const picture = await picturesModel.findOne({ userId: id });

        if (picture) {
            return res.status(200).send(picture);
        }

        return res.status(404).send('Picture not found');
    } catch (error) {
        res.status(400).send("Error:", error);
    }
};

export default { uploadUserPicture, getPicture };

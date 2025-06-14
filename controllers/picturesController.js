
import picturesModel from '../models/picturesModel.js';
import handleRequest from '../utils/handleRequest.js';
import cloudinary from '../config/cloudinary.js';
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary";


// Configurer le stockage Multer vers Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'GestLocal', // Nom du dossier sur Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
});

const upload = multer({ storage: storage });
const uploadSingle = upload.single('image');

async function uploadUserPicture(req, res) {
    uploadSingle(req, res, async function (err) {
        if (err) {
            console.error('Erreur Multer :', err);
            return res.status(400).json({ error: 'Erreur lors de l\'upload de la photo' });
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
                userId: userId,
                imageUrl: req.file.path,
            });

            res.status(200).json({ message: 'Photo uploadée avec succès', url: req.file.path });
        } catch (error) {
            console.error('Erreur serveur :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    });
}

async function getPicture(req, res) {
    const userId = await req.params.id;
    try {
        const picture = await picturesModel.findOne({ userId: userId });

        if (picture) {
            return res.status(200).send(picture);
        }

        return res.status(404).send('Picture not found');

    }
    catch (error) {
        res.status(400).send("Error:", error);
    }

}

export default { uploadUserPicture, getPicture };
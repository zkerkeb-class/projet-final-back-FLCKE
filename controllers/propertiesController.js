import propertiesModel from '../models/propertiesModel.js';
import handleRequest from '../utils/handleRequest.js';

const addProperty = async (req, res) => {
    // Ajout d'une nouvelle propriété
    const { owner_id, name, address, rent_price, status } = req.body;

    // Vérifier si la propriété existe déjà
    const existingProperty = await propertiesModel.find({ name, address, owner_id });
    if (existingProperty.length > 0) {
        return res.status(400).json({ message: 'Property already exists' });
    }

    try {
        // Créer une nouvelle propriété
        const newProperty = await propertiesModel.create({ owner_id, name, address, rent_price, status });
        res.status(201).json(newProperty);
    } catch (error) {
        console.error('Error checking existing property:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllPropertiesByUser = async (req, res) => {
    // Récupérer toutes les propriétés d'un utilisateur
    const { id: owner_id } = req.params;
    const properties = await propertiesModel.find({ owner_id });
    handleRequest.verifyDataNotFound(properties, res);
};

const getPropertyById = async (req, res) => {
    // Récupérer une propriété par ID
    const { id: propertyId } = req.params;
    const property = await propertiesModel.findOne({ _id: propertyId });
    handleRequest.verifyDataNotFound(property, res);
};

const getAllProperties = async (req, res) => {
    // Récupérer toutes les propriétés
    const properties = await propertiesModel.find();
    handleRequest.verifyDataNotFound(properties, res);
};

const deleteProperty = async (req, res) => {
    // Récupérer une propriété par ID
    const { id: propertyId } = req.params;
    const property = await propertiesModel.deleteOne({ _id: propertyId });
    handleRequest.verifyDataNotFound(property, res);
};

const updateProperty = async (req, res) => {
    // Récupérer une propriété par ID
    const { id: propertyId } = req.params;
    const property = await propertiesModel.updateOne({ _id: propertyId }, req.body);
    handleRequest.verifyDataNotFound(property, res);
};

export default {
    addProperty,
    getAllPropertiesByUser,
    getPropertyById,
    getAllProperties,
    deleteProperty,
    updateProperty,
};

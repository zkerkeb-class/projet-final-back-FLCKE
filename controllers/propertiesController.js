import propertiesModel from '../models/propertiesModel.js';
import handleRequest from '../utils/handleRequest.js';


async function addProperty(req, res) {
    // Ajout d'une nouvelle propriété
    let { owner_id, name, address, rent_price, status } = req.body;
    // Vérifier si la propriété existe déjà
    const existingProperty = await propertiesModel.find({ name: name, address: address, owner_id: owner_id });
    if (existingProperty.length > 0) {
        return res.status(400).json({ message: 'Property already exists' });
    }
    try {
        // Créer une nouvelle propriété
        const newProperty = await propertiesModel.create({ owner_id, name, address, rent_price, status });
        newProperty.save()
            .then((property) => {
                res.status(201).json(property);
            })
            .catch(err => res.status(400).json({ error: err.message }));
    }
    catch (error) {
        console.error('Error checking existing property:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
async function getAllPropertiesByUser(req, res) {
    // Récupérer toutes les propriétés d'un utilisateur
    const owner_id = req.params.id;
    const properties = await propertiesModel.find({ owner_id: owner_id });
    handleRequest.verifyDataNotFound(properties, res);
}
async function getPropertyById(req, res) {
    // Récupérer une propriété par ID
    const propertyId = req.params.id;
    const property = await propertiesModel.findOne({ _id: propertyId });
    handleRequest.verifyDataNotFound(property, res);

}
async function getAllProperties(req, res) {
    // Récupérer toutes les propriétés
    const properties = await propertiesModel.find();
    handleRequest.verifyDataNotFound(properties, res);
}
async function deleteProperty(req, res) {
    // Récupérer une propriété par ID
    const propertyId = req.params.id;
    const property = await propertiesModel.deleteOne({ _id: propertyId });
    handleRequest.verifyDataNotFound(property, res);
}
async function updateProperty(req, res) {
    // Récupérer une propriété par ID
    const propertyId = req.params.id;
    const property = await propertiesModel.updateOne({ _id: propertyId }, req.body);
    handleRequest.verifyDataNotFound(property, res);
}

export default {
    addProperty,
    getAllPropertiesByUser,
    getPropertyById,
    getAllProperties,
    deleteProperty,
    updateProperty,
};
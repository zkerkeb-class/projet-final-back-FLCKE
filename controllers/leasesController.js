import leasesModel from '../models/leasesModel.js';
import handleRequest from '../utils/handleRequest.js';


async function addLease(req, res) {
    // Ajout d'un nouveau bail
    let { property_id, tenant_id, start_date, end_date, rent_price } = req.body;
    // Vérifier si le bail existe déjà
    const existingLease = await leasesModel.find({ property_id: property_id, tenant_id: tenant_id, end_date: end_date });
    if (existingLease.length > 0) {
        return res.status(400).json({ message: 'Lease already exists' });
    }
    try {
        // Créer un nouveau bail
        const newLease = await leasesModel.create({ property_id, tenant_id, start_date, end_date, rent_price });
        newLease.save()
            .then((lease) => {
                res.status(201).json(lease);
            })
            .catch(err => res.status(400).json({ error: err.message }));
    }
    catch (error) {
        console.error('Error checking existing lease:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
async function getAllLeasesByUser(req, res) {
    // Récupérer tous les baux d'un utilisateur
    const userId = req.params.id;
    const leases = await leasesModel.find({ tenant_id: userId });
    handleRequest.verifyDataNotFound(leases, res);
}
async function getAllLeasesByProperties(req, res) {
    // Récupérer tous les baux d'un utilisateur
    const userId = req.params.id;
    const leases = await leasesModel.find({ property_id: userId });
    handleRequest.verifyDataNotFound(leases, res);
}

async function getLeaseById(req, res) {
    // Récupérer un bail par ID
    const leaseId = req.params.id;
    const lease = await leasesModel.findOne({ _id: leaseId });
    handleRequest.verifyDataNotFound(lease, res);
}
async function getAllLeases(req, res) {
    // Récupérer tous les baux
    const leases = await leasesModel.find();
    handleRequest.verifyDataNotFound(leases, res);
}
async function deleteLease(req, res) {
    // Récupérer un bail par ID
    const leaseId = req.params.id;
    const lease = await leasesModel.deleteOne({ _id: leaseId });
    handleRequest.verifyDataNotFound(lease, res);
}
async function updateLease(req, res) {
    // Récupérer un bail par ID
    const leaseId = req.params.id;
    const lease = await leasesModel.updateOne({ _id: leaseId }, req.body);
    handleRequest.verifyDataNotFound(lease, res);
}

export default {
    addLease,
    getAllLeasesByUser,
    getAllLeasesByProperties,
    getLeaseById,
    getAllLeases,
    deleteLease,
    updateLease,
};
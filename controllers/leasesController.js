import { add } from 'date-fns';
import leasesModel from '../models/leasesModel.js';
import Properties from '../models/propertiesModel.js';
import Users from '../models/usersModel.js';
import handleRequest from '../utils/handleRequest.js';
import usersController from './usersController.js';


async function addLease(req, res) {
    // Ajout d'un nouveau bail
    let { property_id, name, email, start_date, end_date, rent_date } = req.body;
    // Vérifier si l'utilisateur existe déjà
    const tenant = await usersController.addTenant(email, name);
    if (!tenant) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Vérifier si le bail existe déjà
    const existingLease = await leasesModel.find({ property_id: property_id, tenant_id: tenant._id, end_date: end_date });
    if (existingLease.length > 0) {
        return res.status(400).json({ message: 'Lease already exists' });
    }
    try {
        // Créer un nouveau bail

        const newLease = await leasesModel.create({ property_id, tenant_id: tenant._id, start_date, end_date, rent_date, status: 'En attente' });
        newLease.save()
            .then((lease) => {
                res.status(201).json(lease);
            })
            .catch(err => res.status(400).json({ error: err.message }));
    }
    catch (error) {
        console.error('Error checking existing lease:', error);
        return res.status(500).json({ message: 'Internal server error, Please try after' });
    }
}
async function getAllLeasesByUser(req, res) {
    // Récupérer tous les baux d'un utilisateur

    const userId = req.params.id;
    const leases = await leasesModel.find({ tenant_id: userId }).populate('property_id').populate('tenant_id');
    handleRequest.verifyDataNotFound(leases, res);
}
async function getAllLeasesByOwner(req, res) {
    try {
        const ownerId = req.params.id;
        const properties = await Properties.find({ owner_id: ownerId });

        if (!properties.length) {
            return res.status(404).json({ message: "Aucune propriété trouvée pour cet utilisateur." });
        }

        const propertyIds = properties.map(p => p._id);

        const leases = await leasesModel.find({ property_id: { $in: propertyIds } })
            .populate('property_id')
            .populate('tenant_id');

        res.status(200).json(leases);
    } catch (error) {
        console.error('Error fetching leases by owner:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function getAllLeasesByProperties(req, res) {
    // Récupérer tous les baux d'un utilisateur
    const userId = req.params.id;
    const leases = await leasesModel.find({ property_id: userId }).populate('property_id').populate('tenant_id');
    handleRequest.verifyDataNotFound(leases, res);
}

async function getLeaseById(req, res) {
    // Récupérer un bail par ID
    const leaseId = req.params.id;
    const lease = await leasesModel.findOne({ _id: leaseId }).populate;
    handleRequest.verifyDataNotFound(lease, res);
}
async function getAllLeases(req, res) {
    // Récupérer tous les baux
    const leases = await leasesModel.find().populate('property_id').populate('tenant_id');
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
async function suspendLease(req, res) {
    // Récupérer un bail par ID
    const leaseId = req.params.id;
    const lease = await leasesModel.updateOne({ _id: leaseId }, { status: 'suspendu' });
    handleRequest.verifyDataNotFound(lease, res);
}

export default {
    addLease,
    getAllLeasesByUser,
    getAllLeasesByProperties,
    getLeaseById,
    getAllLeases,
    deleteLease,
    getAllLeasesByOwner,
    updateLease,
    suspendLease,
};
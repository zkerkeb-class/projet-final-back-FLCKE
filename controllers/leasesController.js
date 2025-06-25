import { add } from 'date-fns';
import leasesModel from '../models/leasesModel.js';
import Properties from '../models/propertiesModel.js';
import Users from '../models/usersModel.js';
import handleRequest from '../utils/handleRequest.js';
import usersController from './usersController.js';
import { sendMail } from '../utils/mailSender.js';

const addLease = async (req, res) => {
    let { property_id, name, email, start_date, end_date, rent_date } = req.body;
    const tenant = await usersController.addTenant(email, name);
    if (!tenant) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const existingLease = await leasesModel.find({ property_id: property_id, tenant_id: tenant._id, end_date: end_date });
    if (existingLease.length > 0) {
        return res.status(400).json({ message: 'Lease already exists' });
    }

    try {
        const newLease = await leasesModel.create({ property_id, tenant_id: tenant._id, start_date, end_date, rent_date, status: 'En attente' });
        await Properties.updateOne({ _id: property_id }, { "status": "louer" })
        newLease.save()
            .then((lease) => {
                res.status(201).json(lease)
            })
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        console.error('Error checking existing lease:', error);
        return res.status(500).json({ message: 'Internal server error, Please try after' });
    }
};

const getAllLeasesByUser = async (req, res) => {
    const userId = req.params.id;
    const leases = await leasesModel.find({ tenant_id: userId }).populate('property_id').populate('tenant_id');
    handleRequest.verifyDataNotFound(leases, res);
};

const getAllLeasesByOwner = async (req, res) => {
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
};

const getAllLeasesByProperties = async (req, res) => {
    const userId = req.params.id;
    const leases = await leasesModel.find({ property_id: userId }).populate('property_id').populate('tenant_id');
    handleRequest.verifyDataNotFound(leases, res);
};

const getLeaseById = async (req, res) => {
    const leaseId = req.params.id;
    const lease = await leasesModel.findOne({ _id: leaseId }).populate;
    handleRequest.verifyDataNotFound(lease, res);
};

const getAllLeases = async (req, res) => {
    const leases = await leasesModel.find().populate('property_id').populate('tenant_id');
    handleRequest.verifyDataNotFound(leases, res);
};

const deleteLease = async (req, res) => {
    const leaseId = req.params.id;
    const lease = await leasesModel.deleteOne({ _id: leaseId });
    handleRequest.verifyDataNotFound(lease, res);
};

const updateLease = async (req, res) => {
    const leaseId = req.params.id;
    const lease = await leasesModel.updateOne({ _id: leaseId }, req.body);
    handleRequest.verifyDataNotFound(lease, res);
};

const suspendLease = async (req, res) => {
    const leaseId = req.params.id;
    const lease = await leasesModel.findOne({ _id: leaseId }).populate("tenant_id property_id");
    const result = await leasesModel.updateOne({ _id: leaseId }, { status: 'suspendu' });
    const updateProperty = await Properties.updateOne({ _id: lease.property_id }, { "status": "disponible" })
    try {
        await sendMail({
            to: lease.tenant_id.email,
            subject: 'Suspension de votre location',
            html: `
                <h3>Bonjour ${lease.tenant_id.fullName}</h3>
                <p>Nous vous informons que votre bail pour le bien <strong>${lease.property_id.name}</strong> a été <strong>suspendu</strong>.</p>
                <p>Pour toute question, veuillez nous contacter via ce lien :</p>
                <a href="tel:${lease.property_id.phone}">Contacter le support</a>
                <p>Merci de votre compréhension.</p>
            `
        });

        handleRequest.verifyDataNotFound(result, res);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};


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

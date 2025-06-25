import Users from '../models/usersModel.js';
import Property from '../models/propertiesModel.js';
import Lease from '../models/leasesModel.js';
import payementModel from '../models/payementModel.js';

export const getOwnerDashboardStats = async (req, res) => {
    const { id: ownerId } = req.params;

    if (!ownerId) {
        return res.status(400).json({ message: 'Propriétaire non identifié.' });
    }

    const user = await Users.findById(ownerId);
    if (!user) {
        return res.status(400).json({ message: 'User not found.' });
    }

    // 1. Récupérer les logements du propriétaire
    const ownerProperties = await Property.find({ owner_id: ownerId });
    const propertyIds = ownerProperties.map(p => p._id);

    // 2. Récupérer les baux actifs liés à ces logements
    const leases = await Lease.find({
        property_id: { $in: propertyIds }
    }).populate('tenant_id property_id');

    // 3. Nombre total de logements
    const totalProperties = ownerProperties.length;

    // 4. Nombre de baux actifs
    const totalLeases = leases.length;

    // 5. Revenu mensuel attendu (somme des loyers)

    const Payements = await payementModel.find({
        property: { $in: propertyIds }
    });
    const totalRevenue = Payements.reduce((sum, payment) => {
        if (payment.amount) {
            return sum + payment.amount;
        }
        return sum;
    }, 0);

    res.status(200).json({
        totalProperties,
        totalLeases,
        totalRevenue
    });
};

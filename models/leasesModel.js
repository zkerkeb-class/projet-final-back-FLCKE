import mongoose from 'mongoose';

const leaseSchema = new mongoose.Schema({
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    tenant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['actif', 'termine','suspendu'],
        default: 'actif'
    }
});

export default mongoose.model('Lease', leaseSchema);
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
    rent_date: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        enum: ['En attente', 'actif', 'termine', 'suspendu'],
        default: 'en attente'
    }
});

export default mongoose.model('Lease', leaseSchema);
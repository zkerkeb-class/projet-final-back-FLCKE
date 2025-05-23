import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rent_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['disponible', 'louer'],
        default: 'disponible'
    }
});

export default mongoose.model('Property', propertySchema);

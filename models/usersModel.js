import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String, // hashé
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["proprietaire", "locataire", "admin"],
        required: true
    },
    abonId: {
        type: Schema.Types.ObjectId, // Référence à un autre document
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Users', userSchema);

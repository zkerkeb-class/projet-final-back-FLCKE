import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    fullName: {
        type: String,
        required: false
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
        required: false
    },
    role: {
        type: String,
        enum: ["proprietaire", "locataire", "admin"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', userSchema);

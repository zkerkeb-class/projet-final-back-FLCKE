
import mongoose from 'mongoose';
const { Schema } = mongoose;

const pictureSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Pictures', pictureSchema);
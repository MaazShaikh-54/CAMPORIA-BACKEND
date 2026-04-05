import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        campsite: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campsite',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        journey: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Journey',
            required: true,
        },
    }
);

export default mongoose.model("Review", reviewSchema);
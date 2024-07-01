import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    touristAttractionId: {
        type: String,
        ref: 'TouristAttraction',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

});

const Review = mongoose.model("Review", ReviewSchema);
export default Review;

import Review from "../models/Review.js";

const createReview = async (reviewData) => {
    const review = new Review(reviewData);
    return await review.save();
};

const getReviewsByref_touristSpot = async (ref_turismId) => {
    return await Review.find({ ref_touristSpot }).populate('userId', 'name');
};

const getUserReviews = async (userId) => {
    return await Review.find({ userId }).populate('ref_touristSpotId', 'name');
};

const deleteReview = async (reviewId) => {
    return await Review.findByIdAndDelete(reviewId);
};

export default { createReview, getUserReviews, getReviewsByref_touristSpot, deleteReview };
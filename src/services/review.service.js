import Review from "../models/Review.js";

const createReview = (reviewData) => Review.create(reviewData);

const getReviewsByTouristAttractionId = (touristAttractionId) =>
  Review.find({ touristAttractionId });

const getUserReviews = (userId) => Review.find({ userId });

const updateReview = (id, rating) => 
  Review.findOneAndUpdate(
    { _id: id },
    { rating}
  );
const deleteReview = (reviewId) => Review.findByIdAndDelete(reviewId);

export default {
  createReview,
  getReviewsByTouristAttractionId,
  getUserReviews,
  deleteReview,
  updateReview,
};

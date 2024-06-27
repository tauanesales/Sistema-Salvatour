import Review from "../models/Review.js";

const createReview = (reviewData) => Review.create(reviewData);

const getReviewsByTouristAttractionId = (touristAttractionId) =>
  Review.find({ touristAttractionId });

const updateReview = (id, rating) => 
  Review.findOneAndUpdate(
    { _id: id },
    { $set: { rating } },
    { new: true }
  );

const getUserReviewForAttraction = (userId, touristAttractionId) => 
    Review.findOne({ userId, touristAttractionId });

const getUserReviews = (userId) => Review.find({ userId });

const deleteReview = (reviewId) => Review.findByIdAndDelete(reviewId);

export default {
  createReview,
  getReviewsByTouristAttractionId,
  getUserReviews,
  deleteReview,
  updateReview,
  getUserReviewForAttraction,
};

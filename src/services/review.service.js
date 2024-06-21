import Review from "../models/Review.js";

const createReview = (reviewData) => Review.create(reviewData);

const getReviewsByTouristAttractionId = (TouristAttractionId) =>
  Review.find({ TouristAttractionId });

const getUserReviews = (userId) => Review.find({ userId });

const deleteReview = (reviewId) => Review.findByIdAndDelete(reviewId);

export default {
  createReview,
  getReviewsByTouristAttractionId,
  getUserReviews,
  deleteReview,
};
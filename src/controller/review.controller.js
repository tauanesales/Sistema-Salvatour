import reviewService from "../services/review.service.js";
import jwt from'jsonwebtoken';
import bcrypt from 'bcrypt';

const createReview = async (req, res) => {
  try {
    const {rating} = req.body; 
    const {touristAttractionId} = req.params;

    if (!rating) {
      return res.status(400).json({ error: "Please provide rating" });

    }
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id;

    const existsReview = await reviewService.getUserReviewForAttraction(userId, touristAttractionId);
    let review;
    if (existsReview) {
      review = await reviewService.updateReview(existsReview._id, { rating });  
    } else {

       const reviewData = { userId, touristAttractionId, rating };
       review = await reviewService.createReview(reviewData);}

    res.status(201).json(review);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserReviews = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id;

    const reviews = await reviewService.getUserReviews(userId);
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await reviewService.deleteReview(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export default { createReview, getUserReviews, deleteReview };

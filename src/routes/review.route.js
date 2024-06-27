import express from 'express';
import reviewController from '../controller/review.controller.js';
import { validToken } from "../middlewares/jwt.token.middleware.js";

const route = express.Router();

route.post('/:touristAttractionId', validToken, reviewController.createReview);

route.get('/user', validToken, reviewController.getUserReviews);

route.delete('/:reviewId', validToken, reviewController.deleteReview);

// route.get('/tourist-attraction/:TouristAttractionId', reviewController.getReviewsByTouristAttractionId);

export default route;

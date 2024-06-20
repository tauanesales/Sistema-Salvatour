import express from 'express';
import reviewController from '../controller/review.controller.js';
import { validToken } from "../middlewares/jwt.token.middleware.js";

const route = express.Router();

route.post('/:TouristAttractionId', validToken, reviewController.createReview);

route.get('/tourist-attraction/:TouristAttractionId', reviewController.getReviewsByTouristAttractionId);

route.get('/user', validToken, reviewController.getUserReviews);

route.delete('/:reviewId', validToken, reviewController.deleteReview);

export default route;

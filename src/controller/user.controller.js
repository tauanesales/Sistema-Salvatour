import userService from "../services/user.service.js";
import userService from "../services/review.service.js";
import jwt from'jsonwebtoken';
import bcrypt from 'bcrypt';

const findById = async (req, res) => {
  try {
    const id = req.id;
    const user = await userService.findByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateLoggedUser = async (req, res) => {
  try {
    const { name, email, password, city, state } = req.body;
    if (!name && !email && !password && !city && !state) {
      return res.status(400).json({
        error: "Please add at least one of the fields: name, email, password, city, state",
      });
    }
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id

    let hashedPassword = password;
    if (password) {
      const salt =  await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
      
    }
    await userService.updateService(userId, name, email, hashedPassword, city, state);
    res.json({ message: "User successfully updated!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id

    const result = await userService.deleteUser(userId);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const findByToken = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id
    const user = await userService.findByIdService(userId);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const {rating} = req.body; 
    const {ref_touristSpot} = req.params;

    if (!rating) {
      return res.status(400).json({ error: "Please provide rating" });

    }
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id;

    const reviewData = { userId, ref_touristSpot, rating };
    const review = await reviewService.createReview(reviewData);

    res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error.message });
  }
};



export default { findById, deleteUser, updateLoggedUser, findByToken, createReview, getUserReviews, deleteReview};

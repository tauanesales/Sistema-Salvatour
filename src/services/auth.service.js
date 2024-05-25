import User from "../models/User.js";
import jwt from 'jsonwebtoken'

const authService = (email) => User.findOne({ email });
const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT_KEY, { expiresIn: '1h' });

export { authService, generateToken };

import express from 'express';
import {validToken} from "../middlewares/jwt.token.middleware.js";
import bcrypt from 'bcrypt';
const route = express.Router();

route.get('/', validToken, (req, res) => {
    res.send('Hello World! It works!')
  })

export default route;
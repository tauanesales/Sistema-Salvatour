import express from 'express';
import {validToken} from "../middlewares/jwt.token.middleware.js";
const route = express.Router();

route.get('/', (req, res) => {
    res.send('Hello World! It works!')
  })

export default route;
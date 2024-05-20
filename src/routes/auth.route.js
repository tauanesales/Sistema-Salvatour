import loginController from '../controller/auth.controller.js';
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
const route = express.Router();

route.post('/', loginController.login);

export default route;
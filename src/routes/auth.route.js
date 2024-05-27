import authController from '../controller/auth.controller.js';
import express from 'express';
import cors from 'cors';
import { validEmail } from '../middlewares/global.middlewares.js';


const app = express();
app.use(cors());


const route = express.Router();
route.post('/login', authController.authenticate);
route.post('/register', authController.register);
route.post('/check-mail', validEmail, authController.sendMailController);
route.get('/verify-token/:token', authController.verifyToken);
route.post('/modify-password', authController.modifyPassword);


export default route;

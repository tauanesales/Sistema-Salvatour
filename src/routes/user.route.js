import express from 'express';
import userController from '../controller/user.controller.js';
const route = express.Router();
route.post('/', userController.create);
route.get('/:email', userController.findByEmail);

export default route;
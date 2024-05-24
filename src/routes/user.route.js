import express from 'express';
import userController from '../controller/user.controller.js';
import {validId, validUser} from "../middlewares/global.middlewares.js";
import {validToken} from "../middlewares/jwt.token.middleware.js";

const route = express.Router();

route.post('/', userController.create);
route.get('/:id', validId, validUser, userController.findById);
route.patch("/:id", validId, validUser, userController.update);
route.delete('/:id', userController.deleteUser);
route.post('/check-mail', userController.checkMail);
route.get('/verify-token/:token', userController.verifyToken);
route.post('/modify-password', userController.modifyPassword);

// route.get('/', validToken, userController.findAll);
// route.get('/:id', validId, validUser, validToken, userController.findById);
// route.patch("/:id", validId, validUser, validToken, userController.update);
// route.delete('/:id', validToken, userController.deleteUserById);


export default route;
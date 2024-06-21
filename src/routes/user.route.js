import express from 'express';
import userController from '../controller/user.controller.js';
import {validId, validUser} from "../middlewares/global.middlewares.js";
import {validToken} from "../middlewares/jwt.token.middleware.js";

const route = express.Router();

route.get('/me', validToken, userController.findByToken);
route.get('/:id', validId, validUser, userController.findById);
route.patch('/', validToken, userController.updateLoggedUser);
route.delete('/', validToken, userController.deleteUser);

// route.get('/', validToken, userController.findAll);
// route.get('/:id', validId, validUser, validToken, userController.findById);
// route.patch("/:id", validId, validUser, validToken, userController.update);
// route.delete('/:id', validToken, userController.deleteUserById);


export default route;

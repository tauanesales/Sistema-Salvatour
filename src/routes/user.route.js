import express from 'express';
import userController from '../controller/user.controller.js';
import {validUser} from "../middlewares/global.middlewares.js";
import {validToken, validateIdFromToken} from "../middlewares/jwt.token.middleware.js";

const route = express.Router();

route.get('/', validToken, validateIdFromToken, validUser, userController.findById);
route.patch('/', validToken, validateIdFromToken, userController.updateLoggedUser);
route.delete('/', validToken, validateIdFromToken,userController.deleteUser);


// route.get('/', validToken, userController.findAll);
// route.get('/:id', validId, validUser, validToken, userController.findById);
// route.patch("/:id", validId, validUser, validToken, userController.update);
// route.delete('/:id', validToken, userController.deleteUserById);


export default route;
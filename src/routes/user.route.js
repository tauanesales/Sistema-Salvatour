import express from 'express';
import userController from '../controller/user.controller.js';
const route = express.Router();
import {validId, validUser} from "../middlewares/global.middlewares.js";
import {validToken} from "../middlewares/jwt.token.middleware.js";

route.post('/', userController.create);
route.get('/', /* validToken, */ userController.findAll);
route.get('/:id', validId, validUser, /* validToken, */ userController.findById);
route.patch("/:id", validId, validUser, /* validToken, */ userController.update);
route.delete('/:id', /* validToken, */ userController.deleteUserById);


export default route;
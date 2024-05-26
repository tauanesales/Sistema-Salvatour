import express from 'express';
import adminController from '../controller/admin.controller.js';
import {validUser, validId} from "../middlewares/global.middlewares.js";
import {validToken, validateIdFromToken} from "../middlewares/jwt.token.middleware.js";

const route = express.Router();

route.get('/users', validToken,validateIdFromToken, validUser, adminController.findAll);
route.delete('/user/:id', validToken, validId, validateIdFromToken, validUser, adminController.deleteUserById);
route.patch("/", validToken, validateIdFromToken, validUser, adminController.updateAdmin);


export default route;
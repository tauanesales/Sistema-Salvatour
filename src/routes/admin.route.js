import express from 'express';
import adminController from '../controller/admin.controller.js';
import {validId, validUser} from "../middlewares/global.middlewares.js";
import {validToken} from "../middlewares/jwt.token.middleware.js";

const route = express.Router();

route.get('/users', validToken, adminController.findAll);
route.delete('/user/:id', validToken, adminController.deleteUserById);
route.patch("/:id", validToken, validId, validUser, adminController.updateAdmin);



export default route;
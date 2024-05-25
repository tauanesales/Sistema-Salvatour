import express from 'express';
import adminController from '../controller/admin.controller.js';
import {validId, validUser} from "../middlewares/global.middlewares.js";
import {validToken} from "../middlewares/jwt.token.middleware.js";

const route = express.Router();

route.get('/users', adminController.findAll);
route.delete('/user/:id', adminController.deleteUserById);
route.patch("/:id", validId, validUser, adminController.updateAdmin);



export default route;
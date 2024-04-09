const route = require('express').Router();
const userController = require('../controller/user.controller');
route.post('/', userController.create);
route.get('/:email', userController.findByEmail);

module.exports = route;
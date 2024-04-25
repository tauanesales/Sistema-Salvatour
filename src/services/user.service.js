const User = require('../models/User');

const create = (body) => User.create(body);

const findByEmail = (email) => User.findOne({ email });

module.exports = {
    create,
    findByEmail,
};
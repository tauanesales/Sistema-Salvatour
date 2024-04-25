import User from "../models/User.js";

const create = (body) => User.create(body);

const findByEmail = (email) => User.findOne({ email });

export default {
    create,
    findByEmail
};
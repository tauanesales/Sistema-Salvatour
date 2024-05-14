import User from "../models/User.js";

const create = (body) => User.create(body);

const findAll = () => User.find();

const findByIdService = (id) => User.findOne({ id });

const updateService = (
    id,
    name,
    email,
    password
) => User.findOneAndUpdate(
    {_id: id},{
    name,
    email,
    password});

export default {
    create,
    findAll,
    findByIdService,
    updateService
};
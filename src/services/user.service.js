import User from "../models/User.js";

const create = (body) => User.create(body);

const findAll = () => User.find();

const findByIdService = (id) => User.findOne({ id });

const deleteUserById = async (req, res) => {
    try {
      const requestingUserId = req.user._id;
      const userIdToDelete = req.params.id;
  
      const result = await UserService.deleteUserById(requestingUserId, userIdToDelete);
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

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
    updateService,
    deleteUserById
};
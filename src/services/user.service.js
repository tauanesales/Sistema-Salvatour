import User from "../models/User.js";

const create = (body) => User.create(body);

const findByIdService = (id) => User.findOne({ _id: id });

const findByEmailService = (email) => User.findOne({ email });

const deleteUser = (id) => User.findByIdAndDelete(id);

const updateService = (id, name, email, password) =>
  User.findOneAndUpdate(
    { _id: id },
    {
      name,
      email,
      password
    }
  );

  const updatePasswordService = async (email, password) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { password: password },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        throw new Error('User not found');
      }
  
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

export default {
  create,
  findByIdService,
  updateService,
  deleteUser,
  findByEmailService,
  updatePasswordService
};

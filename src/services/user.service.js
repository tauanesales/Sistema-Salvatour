import User from "../models/User.js";

const registerService = (body) => User.create(body);

const findByIdService = (id) => User.findOne({ _id: id });

const findByEmailService = (email) => User.findOne({ email });

const deleteUser = (id) => User.findByIdAndDelete(id);

const updateService = (id, name, email, password, city, state) =>
  User.findOneAndUpdate(
    { _id: id },
    {
      name,
      email,
      password,
      city,
      state,
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
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

const validatePassword = (password) => {
  return passwordRegex.test(password);
};

export default {
  registerService,
  findByIdService,
  updateService,
  deleteUser,
  findByEmailService,
  updatePasswordService,
  validatePassword,
};

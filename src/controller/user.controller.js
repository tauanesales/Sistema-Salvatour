import userService from "../services/user.service.js";
import bcrypt from "bcrypt";

const findById = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateLoggedUser = async (req, res) => {
  try {
    const { name, email, password, city, state } = req.body;
    if (!name && !email && !password && !city && !state) {
      return res.status(400).json({
        error:
          "Please add at least one of the fields: name, email, password, city, state",
      });
    }
    const userId = req.id;
    let hashedPassword = password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    await userService.updateService(
      userId,
      name,
      email,
      hashedPassword,
      city,
      state
    );
    res.json({ message: "User successfully updated!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.id;
    const result = await userService.deleteUser(userId);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { findById, deleteUser, updateLoggedUser };

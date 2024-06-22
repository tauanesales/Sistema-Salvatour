import adminService from "../services/admin.service.js";
import userService from "../services/user.service.js";

import jwt from "jsonwebtoken";
const findAll = async (req, res) => {
  try {
    const users = await adminService.findAll();
    if (users.length === 0) {
      return res.status(400).json({ error: "There are no registered users" });
    }

    res.json(users);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { name, email, password, city, state } = req.body;
    if (!name && !email && !password && !city && !state) {
      return res.status(400).json({
        error:
          "Please add at least one of the fields: name, email, password, city, state",
      });
    }
    const id = req.params.id;
    let hashedPassword = password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    await userService.updateService(
      id,
      name,
      email,
      hashedPassword,
      city,
      state
    );
    res.json({ message: "User successfully updated!" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id;
    const userIdToDelete = req.params.id;

    const result = await adminService.deleteUserById(userId, userIdToDelete);
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { findAll, deleteUserById, updateAdmin };

import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const findById = async (req, res) => {
  try {
    const id = req.id;
    const user = await userService.findByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
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
    let token = req.headers.authorization;
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id;

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
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id;

    const result = await userService.deleteUser(userId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const findByToken = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id;
    const user = await userService.findByIdService(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { findById, deleteUser, updateLoggedUser, findByToken };

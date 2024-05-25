import adminService from "../services/admin.service.js";
import jwt from'jsonwebtoken'

const findAll = async (req, res) => {
  try {
    const users = await adminService.findAll();
    if (users.length === 0) {
      return res.status(400).json({ error: "There are no registered users" });
    }
    res.json(users);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { name, email, password, city, state } = req.body;
    if (!name && !email && !password && !city && !state ) {
      return res.status(400).json({
        error: "Please add at least one of the fields: name, email, password, city, state",
      });
    }
    const id = req.params.id;
    await userService.updateService(id, name, email, password, city, state);
    res.json({ message: "User successfully updated!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};


export const deleteUserById = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id
    const userIdToDelete = req.params.id;

    const result = await adminService.deleteUserById(
      userId,
      userIdToDelete
    );
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { findAll, deleteUserById, updateAdmin };

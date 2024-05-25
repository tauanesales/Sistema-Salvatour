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

export default { findAll, deleteUserById };

import adminService from "../services/admin.service.js";

const findAll = async (req, res) => {
  try {
    const users = await adminService.findAll();
    if (users.length === 0) {
      return res.status(400).json({ error: "There are no registered users" });
    }

    users.forEach((user) => user.password = "")

    res.json(users);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const requestingUserId = req.body.id;
    const userIdToDelete = req.params.id;

    const result = await adminService.deleteUserById(
      requestingUserId,
      userIdToDelete
    );
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { findAll, deleteUserById };

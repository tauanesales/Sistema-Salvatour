import adminService from "../services/admin.service.js";
import userService from "../services/user.service.js";

const findAll = async (req, res) => {
  try {
    const user = req.user;
    if (user.isAdmin) {
      const users = await adminService.findAll();
      if (users.length === 0) {
        return res.status(400).json({ error: "There are no registered users" });
      }
      res.json(users);
    } else {
      return res.status(400).json({
        error: "You do not have permission to access administrator privileges.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
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
    const id = req.id;
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
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const user = req.user;
    if (user.isAdmin) {
      const userId = req.id;
      const userIdToDelete = req.idToDelete;

      const result = await adminService.deleteUserById(userId, userIdToDelete);
      res.status(200).json(result);
    }else {
      return res
        .status(400)
        .json({
          error:
            "You do not have permission to access administrator privileges.",
        });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { findAll, deleteUserById, updateAdmin };

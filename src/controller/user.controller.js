import userService from "../services/user.service.js";

const findById = async (req, res) => {
  try {
    const id = req.id;
    const user = await userService.findByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return res.status(400).json({
        error: "Please add at least one of the fields: name, email, password",
      });
    }

    if (!userService.validatePassword(password)) {
      return res
        .status(400)
        .json({
          error:
            "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
        });
    }
    const id = req.params.id;
    await userService.updateService(id, name, email, password);
    res.json({ message: "User successfully updated!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;

    const result = await userService.deleteUser(userIdToDelete);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { findById, update, deleteUser };

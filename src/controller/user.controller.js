import userService from "../services/user.service.js";
import jwt from'jsonwebtoken';
import bcrypt from 'bcrypt';

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

    //let "hashed Password";
    let hashedPassword = password;
    if (password) {
      const salt =  await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
      
    }

    await userService.updateService(id, name, email, hashedPassword);
    res.json({ message: "User successfully updated!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateLoggedUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return res.status(400).json({
        error: "Please add at least one of the fields: name, email, password",
      });
    }
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id

    let hashedPassword = password;
    if (password) {
      const salt =  await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
      
    }
    await userService.updateService(userId, name, email, hashedPassword);
    res.json({ message: "User successfully updated!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id

    const result = await userService.deleteUser(userId);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { findById, update, deleteUser, updateLoggedUser };

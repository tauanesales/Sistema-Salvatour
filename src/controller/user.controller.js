import userService from "../services/user.service.js";
import sendMailService from "../services/sendMail.service.js";
import tokenService from "../services/token.service.js";
import bcrypt from 'bcrypt';

const create = async (req, res) => {
  try {

    const requiredFields = ["name", "email", "password", "cityAndState"];

    const { name, email, password, cityAndState } = req.body;


    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Please add the field ${field}` });
      }
    }

    if (!req.body.isAdmin) {
      req.body.isAdmin = false; 
    }

    if (req.body.password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userService.create({
    name,
    email,
    password: hashedPassword,
    cityAndState,
    });


    res.status(201).json({
      message: "User created",
      id: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

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

const deleteUser = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;

    const result = await userService.deleteUser(userIdToDelete);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const checkMail = async (req, res) => {
  try {
    const user = await userService.findByEmailService(req.body.email);
    sendMailService.sendMailService(user.email);
    return res.json({ message: "email sent successfully" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const verifyToken = (req, res) => {
  try {
    const token = parseInt(req.params.token, 10);
    const result = tokenService.verifyToken(token);

    if (!result.valid) {
      return res.status(400).json({ message: result.message });
    }

    return res.json({ message: "Token is valid" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const modifyPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }

    let hashedPassword = password;
    if (password) {
      const salt =  await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    await userService.updatePasswordService(email, hashedPassword);
    return res.json({ message: "User successfully updated!"});
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default { create, findById, update, 
  deleteUser, checkMail, verifyToken, modifyPassword };

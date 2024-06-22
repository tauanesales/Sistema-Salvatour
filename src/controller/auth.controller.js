import { loginService, generateToken } from "../services/auth.service.js";
import userService from "../services/user.service.js";
import sendMailService from "../services/sendMail.service.js";
import tokenService from "../services/token.service.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const authenticate = async (req, res) => {
  try {
    const requiredFields = ["email", "password"];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Please provide the ${field}` });
      }
    }

    let user = await loginService(req.body.email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const verifyPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifyPassword) {
      return res.status(404).json({ error: "Invalid password" });
    }

    const token = generateToken(user.id);

    res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  try {
    const requiredFields = ["name", "email", "password", "city", "state"];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Please add the field ${field}` });
      }
    }

    const { name, email, password, city, state } = req.body;
    const isAdmin = false;
    if (req.body.isAdmin) {
      isAdmin = req.body.isAdmin;
    }

    const existingUser = await userService.findByEmailService(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered." });
    }


    if (!userService.validatePassword(req.body.password)) {
      return res.status(400).json({
        error:
          "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userService.registerService({
      name,
      email,
      password: hashedPassword,
      city,
      state,
      isAdmin,
    });

    res.status(201).json({
      message: "User created",
      id: user._id,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendMailController = async (req, res) => {
  try {
    sendMailService.sendMailService(req.user.email);
    return res.json({ message: "email sent successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
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
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const modifyPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!userService.validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userService.updatePasswordService(email, hashedPassword);
    return res.json({ message: "User successfully updated!" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  authenticate,
  register,
  sendMailController,
  verifyToken,
  modifyPassword,
};

import userService from "../services/user.service.js";
import mongoose from "mongoose";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }
    next();
  } catch (error) {
    console.log(error)
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.findByIdService(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (error) {
    console.log(error)
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const validEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await userService.findByEmailService(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

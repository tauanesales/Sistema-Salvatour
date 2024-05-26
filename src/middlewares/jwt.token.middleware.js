import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const validToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.SECRET_JWT_KEY, (err, decoded) => {
      if (err) {
        console.error("JWT verify error:", err);
        return res.status(403).json({ message: "Invalid token" });
      }

      req.usuario = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const validateIdFromToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    const idToDelete = req.idToDelete;

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    token = token.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const id = decoded.id
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }
    req.id= id;
    req.idToDelete = idToDelete;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

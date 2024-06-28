import jwt from "jsonwebtoken";

export const validToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.SECRET_JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.usuario = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

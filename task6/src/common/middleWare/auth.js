import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config.js";
export const verifyToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    console.log(header);

    const token = header.split(" ")[1];
    jwt.verify(token, JWT_SECRET);
    console.log(token);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
};

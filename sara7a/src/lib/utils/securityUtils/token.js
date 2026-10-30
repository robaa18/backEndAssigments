import { JWT_SECRET } from "../../config/config.js";
import jwt from "jsonwebtoken";
export const generateToken = async (user) => {
  const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

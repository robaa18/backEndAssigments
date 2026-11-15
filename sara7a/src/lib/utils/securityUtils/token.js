import { JWT_SECRET } from "../../config/config.js";
import jwt from "jsonwebtoken";
export const generateToken = async (user,time) => {
  return jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, {
    expiresIn: time,
  });;
};

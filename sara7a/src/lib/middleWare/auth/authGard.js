import { AppError } from "../../../pkg/index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config.js";
export function authGuard(req, res, next) {
  const token = req.cookies?.["access-token"];
  if (!token) {
    throw new AppError("unauthorized", 401);
  }
  try {
    const payload =jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    throw new AppError("unauthorized", 401);
  }
}

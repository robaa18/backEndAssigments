import { JWT_SECRET } from "../../config/config.js";
import AppError from "../../../pkg/errorHandling/appError.js";
import jwt from "jsonwebtoken";
export function validateRefreshToken(refreshToken) {
  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
    return payload;
  } catch (error) {
    throw new AppError("unauthorized", 401);
  }
}

import { AppError } from "../../index.js";
export const userNotFound = new AppError("user does not exist", 404);
export const userExist = new AppError("user already exist", 409);
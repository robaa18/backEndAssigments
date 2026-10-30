import { AppError } from "./index.js";
export const internalServerError = new AppError("internal server error", 500);
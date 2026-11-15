import {AppError} from "./pkg/index.js";
export const internalServerError = new AppError("internal server error", 500);
export const unauthorizedUser =new AppError("unauthorized", 401);

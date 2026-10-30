import { AppError } from "../../index.js";
export const userAlreadyVerified = new AppError("user already verified", 409);
export const otpExpired = new AppError("your otp has been expired please click resend", 400);
export const otpNotValid = new AppError("your otp is not valid", 400);
export const userNotVerified = new AppError("user not verified", 403);
export const invalidCredintials = new AppError("invalid Credintials", 401);

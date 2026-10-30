import { successResponse } from "../../../index.js";
import { authService } from "../services/authService.js";
import {sendOtp} from "../services/otpService.js";
import { toMs } from "../../../pkg/index.js";
const registerController = async (req, res, next) => {
  const user = await authService.registerService(req.body);
  successResponse(201, "user registered successfully", res, user);
};
const VerifyAccount = async (req, res, next) => {
  const { email, value } = req.body;
  const user = await authService.verifyAccount({ email, value });
  successResponse(200, "user verified successfully", res, user);
};
const loginController = async (req, res, next) => {
  const token = await authService.loginService(req.body);
  res.cookie("access-token", token, {
    httpOnly: true,
    maxAge: toMs(1, "hours"),
  });
  successResponse(200, "user login successfully", res);
};
const sendOtpController = async (req, res, next) => {
  await sendOtp(req.body);
  successResponse(200, "otp sent successfully", res);
};
const forgetPasswordController = async (req, res, next) => {
  await authService.forgetPassword(req.body);
  successResponse(200, "password reset successfully", res);
};
const resetPasswordController = async (req, res, next) => {
  await authService.resetPassword(req.body);
  successResponse(200, "password reset successfully", res);
};
const authenticateWithGoogleController = async (req, res, next) => {
  const token = await authService.authenticateWithGoogleService(req.body);
  res.cookie("access-token", token, {
    httpOnly: true,
    maxAge: toMs(1, "hours"),
  });
  successResponse(200, "user login successfully", res);
};
export const authController = {
  registerController,
  loginController,
  VerifyAccount,
  sendOtpController,
  sendOtpController,
  resetPasswordController,
  forgetPasswordController,
  authenticateWithGoogleController,
};

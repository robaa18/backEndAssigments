import { successResponse } from "../../../lib/index.js";
import { authService, sendOtp } from "../services/index.js";
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
const enableTwoStepVerficationController = async (req, res, next) => {
  const { email, value } = req.body;
  const user = await authService.enableTwoStepVerfication({ email, value });
  successResponse(200, "2step verification enabeled successfully", res, user);
};
const verifyTwoStepVerficationCodeController = async (req, res, next) => {
  const { email, value } = req.body;
  const tokens = await authService.verifyTwoStepVerficationCode({
    email,
    value,
  });
  res.cookie("access-token", tokens.accessToken, {
    httpOnly: true,
    maxAge: toMs(1, "hours"),
  });
  res.cookie("refresh-token", tokens.refreshToken, {
    httpOnly: true,
    maxAge: toMs(7, "days"),
  });
  successResponse(200, "user login successfully", res);
};
const loginController = async (req, res, next) => {
  const result = await authService.loginService(req.body);
  if (result.isBanned) {
    res.clearCookie("access-token");
    res.clearCookie("refresh-token");
    return res.status(403).json({ message: "your account is banned" });
  }
  if (!result) {
    successResponse(200, "enter your otp", res);
  }
  res.cookie("access-token", result.accessToken, {
    httpOnly: true,
    maxAge: toMs(1, "hours"),
  });
  res.cookie("refresh-token", result.refreshToken, {
    httpOnly: true,
    maxAge: toMs(7, "days"),
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
  enableTwoStepVerficationController,
  verifyTwoStepVerficationCodeController,
};

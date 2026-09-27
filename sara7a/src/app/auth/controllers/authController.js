import { successResponse } from "../../../index.js";
import { authService } from "../services/authService.js";
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
  await authService.loginService(req.body);
  successResponse(200, "user login successfully", res);
};
export const authController = { registerController, loginController,VerifyAccount };

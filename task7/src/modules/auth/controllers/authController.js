import { authService } from "../services/authService.js";
import { successResponse } from "../../../index.js";
const registerController = async (req, res, next) => {
  const result = await authService.registerService(req.body);
  return successResponse({
    res,
    message: "user registered successfully",
    status: 202,
    data: result,
  });
};
const loginController = async (req, res, next) => {
  const result = await authService.loginService(req.body);//email , password
  return successResponse({
    res,
    message: "login successfully",
    status: 200,
    data: result,
  });
};
export const authController = { registerController,loginController };

import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { validateDto } from "../../../lib/index.js";
import {
  registerDto,
  verifyAccountDto,
  resetPasswordDto,
  loginDto,
  sendOtpDto,
  forgetPasswordDto
} from "../dtos/authDto.js";
import {withIdempotency} from "../../../lib/middleWare/idempotency/idEmpotency.js"
export const authRouter = Router();
authRouter.post(
  "/register",
  validateDto(registerDto),
  authController.registerController,
);
authRouter.patch(
  "/verify",
  validateDto(verifyAccountDto),
  authController.VerifyAccount,
);
authRouter.post("/login", validateDto(loginDto), authController.loginController);
authRouter.post(
  "/send-otp",
  validateDto(sendOtpDto),
  authController.sendOtpController,
);
authRouter.patch(
  "/forget-password",
  validateDto(forgetPasswordDto),
  withIdempotency(),
  authController.forgetPasswordController,
);
authRouter.patch(
  "/reset-password",
  validateDto(resetPasswordDto),
  withIdempotency(),
  authController.resetPasswordController,
);
authRouter.post(
  "/google",
  authController.authenticateWithGoogleController,
);

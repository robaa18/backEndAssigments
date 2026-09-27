import { Router } from "express";
import { authController } from "../controllers/authController.js";
export const authRouter = Router();
authRouter.post("/",authController.registerController);
authRouter.patch("/",authController.VerifyAccount);
authRouter.post("/user",authController.loginController);

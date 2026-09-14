import { Router } from "express";
import { authController } from "../controllers/authController.js";
const authRouter = Router();
authRouter.post("/", authController.registerController);
authRouter.get("/", authController.loginController);
export default authRouter;

import { Router } from "express";
import { authController } from "../controllers/authController.js";
const authRouter = Router();
authRouter.post("/", authController.registerController);
authRouter.post("/register", authController.registerController);
authRouter.post("/signup", authController.registerController);

authRouter.get("/", authController.loginController);
authRouter.post("/login", authController.loginController);
authRouter.post("/signin", authController.loginController);
export default authRouter;

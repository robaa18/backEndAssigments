import { Router } from "express";
import { uploadProfilePictureController } from "../controllers/userController.js";
import { authGuard } from "../../../lib/index.js";
import { validateFile } from "../../../lib/index.js";
import { uploadSingleFileToLocalStorage } from "../../../lib/index.js";
export const userRouter = Router();
userRouter.post("/upload-pp",authGuard,uploadSingleFileToLocalStorage('pp'),validateFile,uploadProfilePictureController);

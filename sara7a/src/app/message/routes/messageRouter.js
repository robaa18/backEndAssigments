import { Router } from "express";
import * as messageController from "../controllers/messageController.js";
import { authGuard } from "../../../lib/index.js";
import { validateDto } from "../../../lib/index.js";
import { sendMessageDto } from "../dto/messageDto.js";
export const messageRouter = Router();
messageRouter.post(
  "/",
  validateDto(sendMessageDto),
  messageController.sendAnonymousMessageController,
);
messageRouter.post(
  "/logged-anonymous",
  validateDto(sendMessageDto),
  authGuard,
  messageController.sendAnonymousMessageController,
);
messageRouter.post(
  "/logged-public",
  validateDto(sendMessageDto),
  authGuard,
  messageController.sendMessageController,
);
messageRouter.get(
  "/",
  authGuard,
  messageController.getMessagesController,
);

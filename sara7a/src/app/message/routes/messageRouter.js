import { Router } from "express";
import * as messageController  from "../controllers/messageController.js";
import { authGuard } from "../../../lib/index.js";
import { validateDto } from "../../../lib/index.js";
import { sendMessageDto } from "../dto/messageDto.js";
import { withCache } from "../../../lib/middleWare/cache/withCache.js";
export const messageRouter = Router();
messageRouter.post(
  "/",
  validateDto(sendMessageDto),
  messageController.sendMessageController,
);
messageRouter.post(
  "/public-message",
  validateDto(sendMessageDto),authGuard,
  messageController.sendMessageController,
);
messageRouter.get(
  "/",
  authGuard,
  messageController.getMessagesController,
);
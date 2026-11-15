import * as messageService from "../services/messageService.js";
import { successResponse } from "../../../lib/index.js";
export const sendAnonymousMessageController = async (req, res, next) => {
  const { content, receiver } = req.body;
  const sender = req.user?.id;
  await messageService.sendMessage(content, sender, receiver, true);
  successResponse(201, "message sent successfully", res);
};
export const sendMessageController = async (req, res, next) => {
  const { content, receiver } = req.body;
  const sender = req.user?.id;
  await messageService.sendMessage(content, sender, receiver, false);
  successResponse(201, "message sent successfully", res);
};
export const getMessagesController = async (req, res, next) => {
  const userId = req.user.id;
  const messages = await messageService.getAllMessages(userId);
  successResponse(200, "this is your all messages", res, messages);
};

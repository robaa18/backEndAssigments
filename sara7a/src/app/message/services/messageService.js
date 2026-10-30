import { userRepo } from "../../user/repos/userRepo.js";
import * as messageRepo from "../repos/messageRepo.js";
import { userNotFound } from "../../user/errors.js";
export async function sendMessage(content, sender, receiver) {
  //check user exist in db
  const exist = await userRepo.checkUserExistanceById(receiver);
  if (!exist) {
    throw userNotFound;
  }
  //save msg
  return await messageRepo.createMessage(content, sender, receiver);
}
export async function getAllMessages(user) {
  const messages = await messageRepo.getMessages(user);
  return messages;
}

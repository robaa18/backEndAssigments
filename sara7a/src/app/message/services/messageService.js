import { userRepo } from "../../user/repos/userRepo.js";
import * as messageRepo from "../repos/messageRepo.js";
import { userNotFound } from "../../user/errors.js";
export async function sendMessage(content, sender, receiver, isAnonymous) {
  //check user exist in db
  const exist = await userRepo.checkUserExistanceById(receiver);
  if (!exist) {
    throw userNotFound;
  }
  //save msg
  return await messageRepo.createMessage(
    content,
    sender,
    receiver,
    isAnonymous,
  );
}
//if isAnonymous = true return sender id
//else ==false no sender id
export async function getAllMessages(user) {
  const messages = await messageRepo.getMessages(user);
  const result = messages.map((e) => {
    if (e.isAnonymous) {
      return { _id: e._id, content: e.content };
    } else {
      return {
        _id: e._id,
        content: e.content,
        sender: e.sender,
      };
    }
  });
  return result;
}

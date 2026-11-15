import { Message } from "../models/messageModel.js";
export const createMessage = async (content, sender, receiver, isAnonymous) => {
  const user = await Message.create({
    content: content,
    receiver: receiver,
    sender: sender,
    isAnonymous: isAnonymous,
  });
  return user;
};
export const checkMessageExist = async (msgId) => {
  const exist = await Message.findById({ _id: msgId });
  return exist;
};
export const getMessages = async (user) => {
  const messages = await Message.find(
    { receiver: user },
    { content: 1, sender: 1, isAnonymous: 1 ,_id:1},
  ).populate("sender", "name _id");
  return messages;
};
export const updateMessage = async (msgId,isAnonymous) => {
  const message = await Message.updateOne(
    { _id: msgId },
    { isAnonymous }
  );
  return ;
};

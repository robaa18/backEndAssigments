import { Message } from "../models/messageModel.js";
export const createMessage = async (content , sender , receiver) => {
  const user = await Message.create({content:content ,receiver:receiver , sender :sender});
  return user;
};
export const getMessages = async (user) => {
  const messages = await Message.find({receiver:user},{content:1,sender:1, _id:0}).populate("sender" ,"name _id");
  return messages;
};
import { Request } from "../models/requestModel.js";
export const createRequest = async (msgId, receiverId, sender) => {
  const request = await Request.create({
    status: "pending",
    message: msgId,
    sender: sender,
    receiver: receiverId,
  });
  return request;
};
export const updateRequestStatus = async (reqId, status) => {
  const request = await Request.updateOne(
    { _id: reqId },
    { status }
  );
  return ;
};

export const getRequests = async (userId) => {
  const requests = await Request.find(
    { $or: [{ receiver: userId }, { sender: userId }] },
    { status: 1, message: 1 },
  );
  return requests;
};
export const getRequest = async (reqId) => {
  const request = await Request.findOne({ _id: reqId });
  return request;
};

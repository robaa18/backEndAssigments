import { checkMessageExist ,updateMessage} from "../../message/repos/messageRepo.js";
import {AppError} from "../../../pkg/index.js";
import {
  createRequest,
  updateRequestStatus,
  getRequest,
  getRequests
} from "../repos/requestRepo.js";
export async function sendRequest(msgId, receiverId) {
  //check msg exist
  const message = await checkMessageExist(msgId);
  if (!message) throw new AppError("message not exist", 404);
  const { sender, isAnonymous } = message;
  //check isAnonymous = true
  if (!isAnonymous) return { message: "identity of sender already shown" };
  //check msg has sender id
  if (!sender) return { message: "sender cannot show hid identity" };
  //receiver with id send request for specific message with id
  const request = await createRequest(msgId, receiverId, sender);
  return { message: "your request is pending wait for response" ,requestId:request._id};
}
export async function acceptRequest(reqId) {
  //get request status
  const request = await getRequest(reqId);
  if (!request) throw new AppError("request not exist", 404);
  if (request.status == "pending") {
    await updateRequestStatus(reqId, "accepted");
    //update is anonymous =false
    await updateMessage(request.message,false)
    return " request accepted successfully";
  }
  return "cannot accept request ";
}
export async function rejectRequest(reqId) {
  //get request status
  const request = await getRequest(reqId);
  if (!request) throw new AppError("request not exist", 404);
  if (request.status == "pending") {
    await updateRequestStatus(reqId, "rejected");
    return " request rejected successfully";
  }
  return"cannot reject request ";
}

export async function getAllRequests(userId) {
  const Requests = await getRequests(userId);
  return Requests;
}

import * as requestService from "../services/requestService.js";
import { successResponse } from "../../../lib/index.js";
export const sendRequestsController = async (req, res, next) => {
  const message = await requestService.sendRequest(
    req.body.message,
    req.user.id,
  );
  successResponse(201, message, res);
};
export const rejectRequestController = async (req, res, next) => {
  const message =await requestService.rejectRequest(req.body.reqId);
  successResponse(200, message, res);
};
export const acceptRequestController = async (req, res, next) => {
  const message =await requestService.acceptRequest(req.body.reqId);
  successResponse(200, message, res);
};
export const getRequestsController = async (req, res, next) => {
  const userId = req.user.id;
  const requests = await requestService.getAllRequests(userId);
  successResponse(200, "this is your all requests", res, requests);
};

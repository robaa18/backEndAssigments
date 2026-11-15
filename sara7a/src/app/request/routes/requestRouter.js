import { Router } from "express";
import * as requestController from "../controllers/requestController.js";
import { authGuard } from "../../../lib/index.js";
import { validateDto } from "../../../lib/index.js";
import { sendRequestDto, acceptOrRejectDto } from "../dtos/requestDto.js";
export const requestRouter = Router();
requestRouter.post(
  //from receiver to sender to show identity
  "/send-request",
  validateDto(sendRequestDto),
    authGuard,
  requestController.sendRequestsController,
);
requestRouter.patch(
  "/accept-request",
  validateDto(acceptOrRejectDto),
    authGuard,
  requestController.acceptRequestController,
);
requestRouter.patch(
  "/reject-request",
  validateDto(acceptOrRejectDto),
    authGuard,
  requestController.rejectRequestController,
);
requestRouter.get(
  "/requests",
    authGuard,
  requestController.getRequestsController,
);

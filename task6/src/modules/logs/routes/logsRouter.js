import { Router } from "express";
import { logsController } from "../controllers/logsController.js";
import { verifyToken } from "../../../common/middleWare/auth.js";
const logsRouter = Router();
// 3. Createacappedcollectionnamed“logs”withasizelimitof1MB.(0.5Grade)
//  URL:POST/collection/logs/capped
logsRouter.post("/collection", verifyToken,logsController.createCappedTable);

logsRouter.post("/",verifyToken, logsController.insertNewDocController);

export default logsRouter;

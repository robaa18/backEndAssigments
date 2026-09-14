import { Router } from "express";
import { authorsController } from "../controllers/authorController.js";
import { verifyToken} from "../../../common/middleWare/auth.js";
const authorRouter = Router();
// 2. Createanimplicitcollectionbyinsertingdatadirectlyinto anewcollectionnamed
// “authors”. (0.5 Grade)
//  URL:POST/collection/authors
authorRouter.post("/collection",verifyToken, authorsController.createAuthorsCollection);
export default authorRouter;

import { Router } from "express";
import { successResponse } from "../../../index.js";
import { createPost,deletePost ,getPostsDetails,getPostsCommentsCount} from "./postService.js";
const router = Router();
router.post("/post", async (req, res) => {
  const data = await createPost(req.body);
  return successResponse({res, data, status:201});
});
router.delete("/:postId/:userId", async (req, res) => {
  const data = await deletePost(req.params);
  return successResponse({res, data, status:200});
});
router.get("/details", async (req, res) => {
  const data = await getPostsDetails();
  return successResponse({res, data, status:200});
});
router.get("/comment-count", async (req, res) => {
  const data = await getPostsCommentsCount();
  return successResponse({res, data, status:200});
});
export default router;

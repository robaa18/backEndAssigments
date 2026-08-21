import { Router } from "express";
import { successResponse } from "../../../index.js";
import {
  createComments,
  updateCommentById,
  getCommentById,
  findRecent3CommentsForASpecificPost,
  findCommentsHaveSpecificWord,
  findOrCreateComment,
} from "./commentService.js";
const router = Router();
router.post("/create", async (req, res) => {
  const data = await createComments(req.body);
  return successResponse({ res, data, status: 201 });
});
router.patch("/:commentId/:userId", async (req, res) => {
  console.log(req.params, req.body);
  const data = await updateCommentById({ ...req.params, ...req.body });
  return successResponse({ res, data, status: 200 });
});
router.post("/find-or-create", async (req, res) => {
  const data = await findOrCreateComment(req.body);
  return successResponse({ res, data, status: 200 });
});
router.get("/search", async (req, res) => {
  const data = await findCommentsHaveSpecificWord(req.query);
  return successResponse({ res, data, status: 200 });
});
router.get("/newest/:postId", async (req, res) => {
  const data = await findRecent3CommentsForASpecificPost(req.params);
  return successResponse({ res, data, status: 200 });
});
router.get("/details/:id", async (req, res) => {
  const data = await getCommentById(req.params);
  return successResponse({ res, data, status: 200 });
});
export default router;

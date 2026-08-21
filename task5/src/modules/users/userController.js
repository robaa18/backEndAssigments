import { Router } from "express";
import { successResponse } from "../../../index.js";
import {
  createUser,
  createOrUpdateUser,
  getUserByEmail,
  getUserById,
} from "./userService.js";
const router = Router();
router.post("/signup", async (req, res) => {
  const data = await createUser(req.body);
  return successResponse({ res, data, status: 201 });
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const [user, created] = await createOrUpdateUser({ id, ...req.body });
  if (created) {
    return successResponse({ res, data: user, status: 201 });
  } else {
    return successResponse({ res, data: user, status: 200 });
  }
});
router.get("/by-email", async (req, res) => {
  const data = await getUserByEmail(req.query);
  return successResponse({ res, data, status: 200 });
});
router.get("/:id", async (req, res) => {
  const data = await getUserById(req.params);
  return successResponse({ res, data, status: 200 });
});
export default router;

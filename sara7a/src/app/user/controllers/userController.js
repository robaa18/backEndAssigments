import { successResponse } from "../../../lib/index.js";
import { uploadProfilePicture } from "../services/userService.js";
export const uploadProfilePictureController = async (req, res, next) => {
  await uploadProfilePicture(req.user.id, req.file.filename);
  successResponse(200, "photo uploaded successfully", res);
};

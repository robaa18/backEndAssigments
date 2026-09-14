import { authorService } from "../services/authorService.js";
import { successResponse } from "../../../index.js";
const createAuthorsCollection = async (req, res, next) => {
  const result = await authorService.createCollection(req.body);
  return successResponse({
    res,
    message: "created successfully",
    status: 202,
    data: result,
  });
};
export const authorsController = { createAuthorsCollection };

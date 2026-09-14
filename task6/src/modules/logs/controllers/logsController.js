import { logsService } from "../services/logsService.js";
import { successResponse } from "../../../index.js";
const createCappedTable = async (req, res, next) => {
  await logsService.createLogsCappedTable(req.query);
  return successResponse({
    res,
    message: "created successfully",
    status: 202,
  });
};
const insertNewDocController = async (req, res, next) => {
  const result = await logsService.insertNewDocService(req.body);
  return successResponse({
    res,
    message: "document created successfully",
    status: 202,
    data: result,
  });
};
export const logsController = { createCappedTable, insertNewDocController };

import { NODE_ENV } from "../../config.js";
export const errorResponse = (err, req, res, next) => {
  return res.status(err.cause?.status ?? 500).json({
    message: err.message ?? "internal server error",
    error: err,
    stack: NODE_ENV==="development"?err.stack:undefined,
  });
};

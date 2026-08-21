import { NODE_ENV } from "../../config.js";
export const errorResponse = (error, req, res, next) => {
  if(error.name?.toLowerCase().includes("sequelize")){
    error.cause ??= {status:400};
  }
  return res.status(error.cause?.status ?? 500).json({
    error: error.message || "internal server error",
    stack :NODE_ENV=="development" ?  error.stack : undefined
  });
};

import { NODE_ENV } from "../../config/config.js";
export const errorResponse = (error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      message: "Invalid JSON format",
    });
  }
  if (error.isOperational === true) {
    return res.status(error.statusCode ?? 500).json({
      message: error.message,
      stack: NODE_ENV === "development" ? error.stack : undefined,
    });
  } else {
    return res.status(500).json({
      message: "internal server error",
      stack: NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

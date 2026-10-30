import { default as AppError } from "../../../pkg/errorHandling/appError.js";
export function validateDto(schema) {
  return async (req, res, next) => {
    if(!req.body||typeof req.body !== "object"){
      throw new AppError("request body is required and should be an object", 400);
    }
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errorMessages = result.error.issues.map(
        (issue) => `${issue.path[0]}:${issue.message}`,
      );
      throw new AppError(errorMessages.join(","), 400);
    }
    req.body = result.data;
    next();
  };
}

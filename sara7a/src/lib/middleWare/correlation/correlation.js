import crypto from "node:crypto";
export const generateCorrelationId = async (req, res, next) => {
  const correlationId = crypto.randomUUID();
  req.correlationId = correlationId;
  res.setHeader("X-Correlation-Id", correlationId);
  next();
};

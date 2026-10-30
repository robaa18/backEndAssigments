import { AppError } from "../../../pkg/index.js";
import { withCache } from "../cache/withCache.js";
export const withIdempotency = (ttl = 3600) => {
  return async (req, res, next) => {
    const idEmpotency = req.headers["idempotency-key"];
    if (!idEmpotency) throw new AppError("this request is un acceptable", 400);
    const key = `${idEmpotency}:${req.method}:${req.originalUrl}`;
    withCache(key, ttl)(req, res, next);
  };
};

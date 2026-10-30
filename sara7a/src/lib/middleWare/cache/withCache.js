import { cacheProvider } from "../../cache/init.js";
export const withCache = (key, ttl = 3600) => {
  return async (req, res, next) => {
    const originalJson = res.json.bind(res);
    const cached = await cacheProvider.get(key);
    //if cached
    if (cached) {
      res.setHeader("X-Cache", "Hit");
      return res.json(cached);
    } else {
      //if not cached
      //next()
      //--->res.json in the controller
      //cache the data in redis server
      //return response
      res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          cacheProvider.set(key, body, ttl).catch((error) => {
            console.log("cache failed", error);
          });
          res.setHeader("X-Cache", "Miss");
          return originalJson(body);
        }
      };
      return next();
    }
  };
};

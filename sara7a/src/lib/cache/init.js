import { RedisCacheProvider } from "../../pkg/index.js";
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "../config/config.js";
export const cacheProvider = new RedisCacheProvider({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD||'',
});

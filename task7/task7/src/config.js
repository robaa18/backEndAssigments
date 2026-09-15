import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(`.env.${process.env.NODE_ENV??"development"}`) });
export const NODE_ENV = process.env.NODE_ENV??'development';
export const SERVER_PORT = parseInt(process.env.SERVER_PORT);
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;

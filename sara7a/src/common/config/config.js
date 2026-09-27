import { config } from "dotenv";
import { resolve } from "node:path";
config({ path: resolve(`.env.${process.env.NODE_ENV??"development"}`) });
export const NODE_ENV = process.env.NODE_ENV??'development';
export const SERVER_PORT = parseInt(process.env.SERVER_PORT);
export const MONGOOSE_URI = process.env.MONGOOSE_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const ACCOUNT_PASSWORD = process.env.ACCOUNT_PASSWORD;
export const ACCOUNT_MAIL = process.env.ACCOUNT_MAIL;


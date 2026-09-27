import { config } from "dotenv";
import { resolve } from "node:path";
config({path : resolve(`.env.${process.env.NODE_ENV??'development'}`)});
export const SERVER_PORT = parseInt(process.env.SERVER_PORT);
export const NODE_ENV= process.env.NODE_ENV??'development'
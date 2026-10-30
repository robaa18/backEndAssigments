import { configExports } from "./lib/index.js";
import dns from 'dns';
import mongoose from "mongoose";
import { app } from "./main.js";
import { mongooseConnection } from "./lib/index.js";
import {  logger } from "./index.js";
import { internalServerError } from "./errors.js";
dns.setServers(['8.8.8.8', '1.1.1.1']);
const shutDown = (exitNumber, server) => {
  server.close(async () => {
    console.log("server closed");
    await mongoose.disconnect();
    process.exit(exitNumber);
  });
};
const serverStart = async (app, port) => {
  try {
    await mongooseConnection();
    const server = app.listen(port, () => {
      logger.info(`server running on port ${port}`);
    });
    process.on("SIGINT", () => {
      shutDown(0, server);
    });
    process.on("SIGTERM", () => {
      shutDown(1, server);
    });
  } catch (error) {
    console.log(error);
    throw internalServerError;
  }
};
serverStart(app, configExports.SERVER_PORT);

import {configExports} from "./common/index.js";
import { app } from "./main.js";
import { mongooseConnection } from "./common/index.js";
import { logger } from "./index.js";
const serverStart = async (app, port) => {
  try {
    await mongooseConnection();
    app.listen(port, () => {
      logger.info(`server running on port ${port}`);
    });
  } catch (error) {
    process.exit(1);
  }
};
serverStart(app,configExports.SERVER_PORT);
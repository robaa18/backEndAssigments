import { SERVER_PORT } from "./common/config/config.js";
import { app } from "./main.js";
import { mongooseConnection } from "./common/db/mongooseConnection.js";
const serverStart = async (app, port) => {
  try {
    await mongooseConnection();
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    process.exit(1);
  }
};
serverStart(app,SERVER_PORT);
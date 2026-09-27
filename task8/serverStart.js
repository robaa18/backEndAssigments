import { SERVER_PORT } from "./common/config/config.js";
import { app } from "./main.js";
import { mongooseConnection } from "./common/db/mongooseConnection.js";
const startServer = async () => {
  try {
    await mongooseConnection.connectDB();
    console.log(`database connected successfully`);

    app.listen(SERVER_PORT, () => {
      console.log(`server is running on port ${SERVER_PORT}`);
    });
  } catch (error) {}
};
startServer();
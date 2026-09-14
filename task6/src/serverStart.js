import { SERVER_PORT } from "./config.js";
import { default as app } from "./main.js";
import { client } from "./index.js";
const startServer = async function (port, app) {
  try {
    await client.connect();
    console.log("db connected successfully");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
startServer(SERVER_PORT, app);
export default startServer;

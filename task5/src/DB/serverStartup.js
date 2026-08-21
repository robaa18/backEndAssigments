import { sequelize } from "./dbConnection.js";
export const startServer = async (app, port) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter:false})
    console.log("Connection has been established successfully.");
    app.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  } catch (error) {
    console.log("cannot connect to db",error);
    process.exit(1);
  }
};

import * as mongoose from "mongoose";
import { MONGOOSE_URI } from "../config/config.js";
export const mongooseConnection = () => {
  mongoose.connect(MONGOOSE_URI);
};

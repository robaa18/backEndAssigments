import express from "express";
import { startServer } from "./index.js";
import './index.js';
import {SERVER_PORT} from "./config.js";
import { commentsController, errorResponse, postsController, userController } from "./index.js";
const app = express();
app.use(express.json());
app.use('/user',userController);
app.use('/posts',postsController);
app.use('/comment',commentsController);
startServer(app,SERVER_PORT);
app.all("/", (req, res, next) => {
  return res.status(200).json({ message: "welcome to backend server" });
});
app.all('{/*dummy}', ( req, res, next) => {
  return res.status(404).json({ message: "in-valid routing" });
});
app.use(errorResponse);
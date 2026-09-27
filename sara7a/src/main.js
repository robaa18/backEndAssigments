import express from "express";
import {
  authRouter,
  errorResponse,
  messageRouter,
  userRouter,
} from "./index.js";
export const app = express();
app.use(express.json());
app.use("/message", messageRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.all("/", (req, res, next) => {
  return res.status(200).json({ message: "welcome to BE" });
});
app.all("{/*dummy}", (req, res, next) => {
  return res.status(404).json({ message: "in-valid routing" });
});
app.use(errorResponse);

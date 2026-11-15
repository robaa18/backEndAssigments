import express from "express";
import cookieParser from "cookie-parser";
import { authRouter, messageRouter, userRouter, requestRouter } from "./index.js";
import { errorResponse } from "./index.js";
import { generateCorrelationId } from "./lib/index.js";
import cors from "cors";
export const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};
import { resolve } from "node:path";
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/assets", express.static(resolve("assets")));
app.use(generateCorrelationId);
app.use("/messages", messageRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/request", requestRouter);
app.all("/", (req, res, next) => {
  return res.status(200).json({ message: "welcome to BE" });
});
app.all("{/*dummy}", (req, res, next) => {
  return res.status(404).json({ message: "in-valid routing" });
});

app.use(errorResponse);

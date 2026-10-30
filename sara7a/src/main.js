import express from "express";
import cookieParser from "cookie-parser"
import {
  authRouter,
  errorResponse,
  messageRouter,
  userRouter,
  generateCorrelationId,
} from "./index.js";
import cors from "cors";
export const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use(generateCorrelationId);
app.use("/messages", messageRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.all("/", (req, res, next) => {
  return res.status(200).json({ message: "welcome to BE" });
});
app.all("{/*dummy}", (req, res, next) => {
  return res.status(404).json({ message: "in-valid routing" });
});
app.use(errorResponse);

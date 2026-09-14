import express from "express";
import {
  booksRouter,
  authorRouter,
  logsRouter,
  errorResponse,
  authRouter,
} from "./index.js";
const app = express();

app.use(express.json());
app.use("/user", authRouter);
app.use("/book", booksRouter);
app.use("/author", authorRouter);
app.use("/logs", logsRouter);

app.all("/", (req, res, next) => {
  return res.status(200).json({ message: "welcome to BE" });
});
app.all("{/*dummy}", (req, res, next) => {
  return res.status(404).json({ message: "in-valid routing" });
});
app.use(errorResponse);
export default app;

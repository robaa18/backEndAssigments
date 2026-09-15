import express from "express";
import cors from "cors";
import {
  booksRouter,
  authorRouter,
  logsRouter,
  errorResponse,
  authRouter,
} from "./index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", authRouter);
app.use("/users", authRouter);
app.use("/auth", authRouter);
app.use("/book", booksRouter);
app.use("/books", booksRouter);
app.use("/author", authorRouter);
app.use("/authors", authorRouter);
app.use("/logs", logsRouter);
app.use("/collection/books", booksRouter);
app.use("/collection/authors", authorRouter);
app.use("/collection/logs", logsRouter);

app.all("/", (req, res, next) => {
  return res.status(200).json({ message: "welcome to BE" });
});
app.all("{/*dummy}", (req, res, next) => {
  return res.status(404).json({ message: "in-valid routing" });
});
app.use(errorResponse);
export default app;

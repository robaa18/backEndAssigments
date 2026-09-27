import express from "express";
import { errorResponse } from "./common/middleWare/errorResponse.js";
export const app = express();
app.use(express.json());
app.all("/", (req, res, next) => {
  return res.status(200).json({ message: `welcome to be server` });
});
app.all("{/*dummy}", (req, res, next) => {
  return res.status(404).json({ message: "invalid-routing" });
});
app.use(errorResponse);

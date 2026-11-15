import multer from "multer";
import { resolve } from "node:path";
import crypto from "crypto";
import AppError from "../../../pkg/errorHandling/appError.js";
export let allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "video/mp4",
];
 const createMulterStorage = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, resolve("temp"));
    },
    filename: function (req, file, cb) {
      cb(null, `${crypto.randomInt(100000, 999999)}-${file.originalname}`);
    },
  });
  return storage;
};
export const upload = multer({
  fileFilter: function (req, file, cb) {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new AppError("in-valid file type", 400), false);
    }
    cb(null, true);
  },
  storage: createMulterStorage(),
});

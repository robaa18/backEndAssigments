import fs  from "node:fs";
import { rename, unlink } from "node:fs/promises"
import { fileTypeFromBuffer } from "file-type";
import AppError from "../../../pkg/errorHandling/appError.js";
import { resolve } from "node:path";
import { allowedTypes } from "../../media/multer/multer.js";
export const validateFile = async (req, res, next) => {
  try {
    //get the file path
    let path = resolve(req.file?.path);
    if (!path) {
      return next(new AppError("no file"), 400);
    }
    const assetsPath = resolve("assets", req.file.filename);
    //read the file
    let buffer = fs.readFileSync(path);
    //check the file type from buffer
    const type = await fileTypeFromBuffer(buffer);
    //return validation
    if (!type || !allowedTypes.includes(type.mime)) {
      //if not valid delete from temp
       unlink(path);
      return next(new AppError("in-valid file type"), 400);
    } else {
      //if valid move it into assets
       rename(path, assetsPath);
      return next();
    }
  } catch (error) {
    return next(new AppError("internal server error"), 500);
  }
};

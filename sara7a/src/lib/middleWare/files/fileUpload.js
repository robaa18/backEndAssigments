import { upload } from "../../media/multer/multer.js";
export const uploadSingleFileToLocalStorage = (fieldName) => {
  return (req, res, next) => {
    return upload.single(fieldName)(req, res, next);
  };
};
export const uploadMultiFilesToLocalStorage = (fieldName, maxCount) => {
  return async (req, res, next) => {
    return upload.array(fieldName, maxCount)(req, res, next);
  };
};
export const uploadMultiFieldsToLocalStorage = (fields) => {
  return async (req, res, next) => {
    return upload.fields(fields)(req, res, next);
  };
};

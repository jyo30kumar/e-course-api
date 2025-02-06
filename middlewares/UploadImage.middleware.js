import multer from "multer";
import { CustomError } from "../utils/customError.js";
import { uploadFile } from "../utils/uploadFileCloudinary.js"; //validation logic is in this file

const  uploadImage = uploadFile.single("blogImage");

const uploadImageHandler = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) =>
      uploadImage(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      })
    );
    if (!req.file) {
      throw new CustomError("Image file is not provided", 400);
    }
    next();
  } catch (error) {
    if (error instanceof multer.MulterError) {
      return next(error);
    }
    return next(error);
  }
};

export { uploadImageHandler };

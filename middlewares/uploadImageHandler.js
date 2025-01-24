import multer from "multer";
// import { blogStorage } from "../config/Cloudinary.config.js";
import { CustomError } from "../utils/customError.js";
import { upload } from "../utils/cloudinaryStorage.js";

const uploadImage = upload.single("blogImage");

const uploadImageHandler = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) =>
      uploadImage(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      })
    );
    if (!req.file) {
      throw new CustomError("File is not provided", 400);
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

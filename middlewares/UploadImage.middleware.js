import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CustomError } from "../utils/customError.js";
import { uploadFile } from "../utils/uploadFileCloudinary.js"; //validation logic is in this file

// for upload Image Cloudinary
const uploadImage = uploadFile.single("blogImage");
const updateImage = uploadFile.single("blogImage");

const uploadImageHandler = async (req, res, next) => {
  try {
    // upload image in order to parse data
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

//update image from cloudinary
const updateImageHandler = async (req, res, next) => {
  try {
    //first upload image in order to parse data
    await new Promise((resolve, reject) =>
      updateImage(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      })
    );
    if (!req.file) {
      throw new CustomError("Image file is not provided", 400);
    }
    const publicId = req.body.publicId;

    if (!publicId) {
      throw new CustomError(
        "publicId is required to overwrite the image.",
        400
      );
    }

    // Delete old image from Cloudinary
    await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
      resource_type: "image",
    });

    next();
  } catch (error) {
    if (error instanceof multer.MulterError) {
      return next(error);
    }
    return next(error);
  }
};

export { uploadImageHandler, updateImageHandler };

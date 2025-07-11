import multer from "multer";
import { CustomError } from "./customError.js";
import { blogStorage } from "../config/Cloudinary.config.js";

// File filter to restrict file types and validating inputs before uploading to cloudinary
const fileFilter = (req, file, cb) => {
  const { title, categoryId } = req.body;
  // validating inputs fields
  if (!title) {
    cb(new CustomError("Title required", 400), false);
  } else if (!categoryId) {
    cb(new CustomError("Category Id is required.", 400), false);
  }
  // filter files
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(
      new CustomError(
        "Invalid file type, only PNG, JPG and JPEG are allowed!",
        400
      ),
      false
    );
  }
};

const uploadFile = multer({
  storage: blogStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, //2MB limit
});
export { uploadFile };

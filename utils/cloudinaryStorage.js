import multer from "multer";
import { cloudinary } from "../config/Cloudinary.config.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// creating a storage for file in cloudinary
const blogStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/blog-images",
    format: "png",
    public_id: (req, file) =>
      `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    transformation: [
      { width: 500, height: 500, crop: "limit"},
      { quality: "auto:good", fetch_format: "auto" }, // Automatically fetch best format
    ],
  },
});

// File filter to restrict file types
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(
      new CustomError("Invalid file type, only PNG and JPEG are allowed!", 400),
      false
    );
  }
};

const upload = multer({
  storage: blogStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, //2MB limit
});

export { upload };

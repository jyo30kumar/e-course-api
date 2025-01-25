import {} from "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary configuration for uploading images to the cloud
cloudinary.config({
  cloud_name: "dr0tjs58l",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:true
});

// creating a storage for file in cloudinary
const blogStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/blog-images",
    format: "png",
    public_id: (req, file) =>
      `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    transformation: [
      { width: 500, height: 500, crop: "limit" },
      { quality: "auto:good", fetch_format: "auto" },
    ],
  },
});

export { blogStorage };

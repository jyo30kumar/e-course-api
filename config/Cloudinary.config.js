import {} from "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration for uploading images to the cloud

cloudinary.config({
  cloud_name: "dr0tjs58l",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:true
});

export { cloudinary };

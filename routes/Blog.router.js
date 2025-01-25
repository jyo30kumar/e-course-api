import { Router } from "express";
import { blogController as controller } from "../controllers/Blog.controller.js";
import { uploadImageHandler } from "../middlewares/UploadImage.middleware.js";
import { CustomError } from "../utils/customError.js";

// mini app 
const blogRouter = Router();
blogRouter.post("/upload",
    uploadImageHandler, // upload image to the cloudinary after validation
    controller.uploadBlog // controller
);

export {blogRouter};
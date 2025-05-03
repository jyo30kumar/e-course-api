import { Router } from "express";
import { blogController as controller } from "../controllers/Blog.controller.js";
import { updateImageHandler, uploadImageHandler } from "../middlewares/UploadImage.middleware.js";

// mini app
const blogRouter = Router();
blogRouter.get("/getBlogById/:id",controller.getBlogById);
blogRouter.get("/getAllBlogs",controller.getAllBlogs);
blogRouter.post(
  "/upload",
  uploadImageHandler, // upload image to the cloudinary after validation
  controller.uploadBlog // controller
);
blogRouter.put("/update/:id", updateImageHandler, controller.updateBlog);

export { blogRouter };

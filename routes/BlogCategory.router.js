import { Router } from "express";
import { blogCategoryController as controller} from "../controllers/BlogCategory.controller.js";

const blogCategoryRouter = Router();

blogCategoryRouter.get("/all", controller.getAllBlogCategory);
blogCategoryRouter.post("/add", controller.addBlogCategory);
blogCategoryRouter.put("/update/:id", controller.updateBlogCategory);

export {blogCategoryRouter}
import { Router } from "express";
import { blogCategoryController as controller} from "../controllers/BlogCategory.controller.js";

const blogCategoryRouter = Router();

blogCategoryRouter.get("/", controller.getAllBlogCategory);
blogCategoryRouter.post("/", controller.addBlogCategory);
blogCategoryRouter.put("/:id", controller.updateBlogCategory);

export {blogCategoryRouter}
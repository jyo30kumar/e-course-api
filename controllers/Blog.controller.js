import { blogServices as services } from "../services/Blog.service.js";
import { CustomError } from "../utils/customError.js";

//fetch a blog data
const getBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    if(!blogId) {
      throw new CustomError("Blog id is required", 400);
    }
    const blog = await services.fetchBlogById(blogId);
    res.status(200).json(blog);
  } catch (error) {
    throw error;
  }
}

//get all blog function
const getAllBlogs = async(req, res, next) =>{
  try {
      const blogs = await services.fetchAllblogs();  
      res.status(200).json(blogs);
  } catch (error) {
    throw error;
  }
}

// add a blog function
const uploadBlog = async (req, res, next) => {
  try {
    const result = await services.addBlog(req.body, req.file);
    if (result) {
      res
        .status(201)
        .json({ success: true, message: "Blog uploaded successfully." });
    }
  } catch (error) {
    next(error);
  }
};

// update blog function
const updateBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    if(!blogId) {
      throw new CustomError("Blog id is required", 400);
    }

    const BlogExists = await services.fetchBlogById(blogId);
    if(!BlogExists){
      throw new CustomError("Blog not found", 404);
    }

    const result = await services.editBlog(blogId, req.body, req.file);
    if(result) {
      res
      .status(200)
      .json({ success: true, message: "Blog updated successfully." });
    }
  } catch (error) {
    next(error);
  }
};

const blogController = {
  getBlogById,
  getAllBlogs,
  uploadBlog,
  updateBlog,
};

export { blogController };

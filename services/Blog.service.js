import mongoose from "mongoose";
import { Blog } from "../database/models/Blog.model.js";
import { CustomError } from "../utils/customError.js";

const fetchBlogById = async (id) => {
  try {
    if (!id || id === ":id") {
      throw new CustomError("Category id is not defined.", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid Category ID format.", 400);
    }
    const blog = await Blog.findById(id);
    if (blog.length === 0) {
      throw new CustomError("Blog not found.", 404);
    }
    // console.log("Fetched Blog by id :", blog);
    return blog;
  } catch (error) {
    throw error;
  }
};

const fetchAllblogs = async () =>{
    try {
        const result = await Blog.find();
        if(result.length === 0){
            throw new CustomError("No blog found", 404)
        }
        return result;
    } catch (error) {
        throw error;
    }
}

const addBlog = async ({ title, content, readingTime, categoryId }, file) => {
  try {
    //validation of input logic is in ./utils/uploadFileCloudinary.js
    const blogData = new Blog({
      title: title,
      image: {
        url: file.path,
        publicId: file.filename,
      },
      content: content,
      readingTime: readingTime,
      category: categoryId,
    });

    const result = await blogData.save();
    // console.log("Returned table data", result);
    return result;
  } catch (error) {
    throw error;
  }
};

const editBlog = async (
  blogId,
  { title, content, readingTime, categoryId},
  file
) => {
  try {
    //validation of input logic is in ./utils/uploadFileCloudinary.js
    const updatedBlogData = {
      title: title,
      image: {
        url: file.path,
        publicId: file.filename,
      },
      content: content,
      readingTime: readingTime,
      category: categoryId,
    };
    const result = await Blog.updateOne({ _id: blogId }, updatedBlogData);    
    return result;
  } catch (error) {
    throw error;
  }
};

const blogServices = {
  fetchBlogById,
  fetchAllblogs,
  addBlog,
  editBlog,
};

export { blogServices };

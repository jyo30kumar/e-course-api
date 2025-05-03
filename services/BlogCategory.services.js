import mongoose from "mongoose";
import { BlogCategory } from "../database/models/BlogCategory.model.js";
import { CustomError } from "../utils/customError.js";

const newBlogCategory = async (category) => {
  try {
    if (!category) {
      throw new CustomError("Category is required", 400);
    }
    const insertBlogCategory = await BlogCategory.create({ category });
    return;
  } catch (error) {
    throw error;
  }
};

const fetchAllBlogCategories = async () => {
  try {
    const result = await BlogCategory.find({}, "category");
    return result;
  } catch (error) {
    throw error;
  }
};

const editBlogCategory = async (id, category) => {
  try {
    if (!id || id === ":id") {
      throw new CustomError("Category id is not defined.", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid Category ID format.", 400);
    }
    if (!category) {
      throw new CustomError("Category is undefined.", 400);
    }
    const result = await BlogCategory.updateOne(
      { _id: id },
      { category: category }
    );
    if (result.matchedCount == 0) {
      throw new CustomError("No match found.", 400);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const deleteBlogCategory = async (id) => {
  try {
    if (!id || id === ":id") {
      throw new CustomError("Category id is not defined.", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid Category ID format.", 400);
    }
    const result = await BlogCategory.deleteOne({ _id: id });
    if(result.deletedCount === 0){
      throw new CustomError("Category data not found.", 404);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const deleteAllBlogCategory = async (id) => {
  try {
    const result = await BlogCategory.deleteMany({});
    if(result.deletedCount === 0){
      throw new CustomError("No categories found to delete.", 404);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const blogCategoryServices = {
  newBlogCategory,
  fetchAllBlogCategories,
  editBlogCategory,
  deleteBlogCategory,
  deleteAllBlogCategory,
};

export { blogCategoryServices };

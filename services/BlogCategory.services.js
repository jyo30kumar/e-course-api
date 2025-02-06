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

const fetchAllBlogCategories = async() => {
    try {
        const result = await BlogCategory.find({}, "category");
        return result;
    } catch (error) {
        throw error;
    }
}

const editBlogCategory = async(id, category) =>{
    try {
        if(!category){
            throw new CustomError("Category is undefined.", 400);
        }
        const result = await BlogCategory.updateOne({_id:id},{category});
        if(result.modifiedCount == 0){
            throw new CustomError("No match found.", 400)
        }
        return;
    } catch (error) {
        throw error;
    }
}

const blogCategoryServices = {
  newBlogCategory,
  fetchAllBlogCategories,
  editBlogCategory,
};

export { blogCategoryServices };

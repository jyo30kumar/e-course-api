import { blogCategoryServices as services } from "../services/BlogCategory.services.js";

const getAllBlogCategory = async (req, res, next) => {
    try {
      const result = await services.fetchAllBlogCategories();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

const addBlogCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    const result = await services.newBlogCategory(category);
    res
      .status(201)
      .json({ success: true, message: "Blog category is added successfully." });
  } catch (error) {
    next(error);
  }
};

const updateBlogCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    const result = await services.editBlogCategory(id, category);
    // console.log("Blog Category updated Data", result);
    if(result){
        res
      .status(200)
      .json({ success: true, message: "Category updated successfully." });
    }
  } catch (error) {
    next(error);
  }
};

const deleteBlogCategory = async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await services.deleteBlogCategory(id);
        if(result){
        res.status(200).json({success:true, message:"Blog Category deleted successfully."});
        }

    } catch (error) {
        next(error);
    }
}
const deleteAllBlogCategory = async(req, res, next) => {
    try {
        const result = await services.deleteAllBlogCategory;
        if(result){
        res.status(200).json({success:true, message:"All Blog Category deleted successfully."});
        }

    } catch (error) {
        next(error);
    }
}

const blogCategoryController = {
  addBlogCategory,
  getAllBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  deleteAllBlogCategory,
};

export { blogCategoryController };

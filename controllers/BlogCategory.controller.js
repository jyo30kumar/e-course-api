import { blogCategoryServices as services} from "../services/BlogCategory.services.js"

const addBlogCategory = async (req, res, next) => {
    try {
        const {category} = req.body;
        const result = await services.newBlogCategory(category);
        res.status(201).json({success:true, message:"Blog category is added successfully."})
    } catch (error) {
        next(error);
    }
}
const getAllBlogCategory = async(req, res, next) => {
    try {
        const result =  await services.fetchAllBlogCategories();
        res.status(200).json(result);
        
    } catch (error) {
        next(error)
    }
}

const updateBlogCategory = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {category} = req.body;        
        const result = await  services.editBlogCategory(id, category);
        res.status(200).json({success:true, message:"Category updated successfully."});  
    } catch (error) {
        next(error)
    }
}
const blogCategoryController = {
    addBlogCategory,
    getAllBlogCategory,
    updateBlogCategory,
}

export {blogCategoryController}
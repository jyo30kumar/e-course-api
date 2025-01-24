import { blogServices as services} from "../services/Blog.service.js"

const uploadBlog = async(req, res, next) =>{
    try {
        const result = await services.addBlog(req.body, req.file);
        res.status(201).json("Blog uploaded successfully.");
    } catch (error) {
        next(error)
    }
}

const blogController = {
    uploadBlog,
}

export {blogController}
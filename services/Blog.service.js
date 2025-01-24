import { Blog } from "../database/models/Blog.model.js";
import { CustomError } from "../utils/customError.js";

const addBlog = async ({title, content, createdDate, updatedDate, readingTime}, file) =>{
    try {
        const blogData = new Blog({
            title:title,
            imageUrl:file.path,
            content:content,
            createdDate:createdDate,
            updatedDate:updatedDate,
            readingTime:readingTime,
        })

        const result = await blogData.save();
        console.log("table returned data", result);
        
    } catch (error) {
        throw(error);
    }
}

const blogServices = {
    addBlog,
}

export {blogServices}
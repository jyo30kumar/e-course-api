import { Router } from "express";
import { blogController as controller } from "../controllers/Blog.controller.js";
import { uploadImageHandler } from "../middlewares/uploadImageHandler.js";
import { CustomError } from "../utils/customError.js";
import multer from "multer";
// mini app 
const blogRouter = Router();

// Memory storage for data temporarily so that i can parse
const storage = multer.memoryStorage();
const newupload = multer({ storage });
const parsedData = newupload.none();

// validating if title and createdDate exist
const validateBlogInput = (req, res, next) => {
    console.log("validation input fields: ",req.body);        
    const {title, createdDate} = req.body;
    if(!title || !createdDate){
        return next(new CustomError("Title or Created Date is required", 400));
    }
    next();
}

blogRouter.post("/upload",
    parsedData, // parse data from multipart/fomr-data
    validateBlogInput, // validate input before uploading image to cloudinary
    uploadImageHandler, // upload image to the cloudinary after validation
    controller.uploadBlog // controller
);

export {blogRouter};
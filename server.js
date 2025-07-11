import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { db } from './database/db.js';
import bodyParser from 'body-parser';
import { authRouter } from './routes/Auth.router.js';
import { errorHandler } from './middlewares/ErrorHandler.middleware.js';
import { CustomError } from './utils/customError.js';
import { blogRouter } from './routes/Blog.router.js';
import { blogCategoryRouter } from './routes/BlogCategory.router.js';

// variables declaration 
const app = express();
const PORT = process.env.PORT??8000;

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

// database connection 
db().then(()=>{
    console.log("Database connection successful.");
}).catch((error) =>{
    console.error("Database connection failed. ", error);
})

//api endpoints
app.use("/api/auth", authRouter)
app.use("/api/blog", blogRouter);
app.use("/api/blogCategory", blogCategoryRouter);


// error handling for all undefined routes
app.use("*", (req, res, next) =>{
    throw new CustomError(`Not Found - ${req.originalUrl}`, 404)
})

//global error handler middleware
app.use(errorHandler);


// server running
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})
import mongoose from "mongoose";
const {Schema} = mongoose;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    createdDate:{
        type:Date,
        required:true,
    },
    updatedDate:{
        type:Date,
    },
    readingTime:{
        type:String,
    },
    imageUrl:{
        type:String
    },
    content:{
        type:String,
    }
});

const Blog = mongoose.model('Blog',blogSchema);

export {Blog};
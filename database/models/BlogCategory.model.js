import mongoose, {Schema} from "mongoose";

const blogCategorySchema = new Schema({
    category:{
        type:String,
        required:"Category is required",
        trim:true,
    }
},
{
    timestamps:true
})

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema)

export {BlogCategory};
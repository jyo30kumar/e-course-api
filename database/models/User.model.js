import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: Number,
  
  isVerify: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

export { User };

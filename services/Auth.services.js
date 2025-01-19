import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { CustomError } from "../utils/customError.js";
import { hashString } from "../utils/hashString.js";
import { otpService } from "../utils/otpService.js";
import { validateEmail } from "../utils/validator.js";
import { User } from "../database/models/User.model.js";

const generateAndSendEmailOtp = async(email) => {
  try {
    // input validation
    if (!email) {
      throw new CustomError("Email is required.", 400);
    }
    // validating email
    if (!validateEmail(email)) {
      throw new CustomError("Invalid Email Format.", 400);
    }
    //check duplicate email entry
    const fetchUser = await User.findOne({userEmail:email});
    if(fetchUser){
      throw new CustomError("User already exist", 409)
    }

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("OTP : ", otp);

    // send otp to email
    otpService.sendOtpEmail(email, otp);

    //generate token
    const token = jwt.sign({ email, otp }, process.env.SECRETKEY, {
      expiresIn: "5m",
    });

    return token;
  } catch (error) {
    throw error;
  }
};

const verifyEmailOtp = (tokenOtp, clientOtp) => {
  console.log("OTP from token:", tokenOtp);

  try {
    if (!clientOtp) {
      throw new CustomError("OTP is required.", 400);
    }
    if (tokenOtp != clientOtp) {
      throw new CustomError("Invalid OTP", 400);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const registerUserEmail = async (email) => {
  const newUser = new User({
    userEmail: email,
    isVerify: 1,
  });
  try {
    const data = await newUser.save({ validateBeforeSave: false });
    return { success: true, id: data._id };
  } catch (error) {
    throw error;
  }
};

const registerUserProfile = async ({
  firstName,
  lastName,
  phoneNumber,
  password,
  id,
}) => {
  try {
    if (!password) {
      throw new CustomError("Password is required", 400);
    }
    //hashing password
    const hashedPassword = await hashString(password);
    // register user profile
    const userProfile = await User.updateOne(
      { _id: id, isVerify: 1 },
      {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        isVerify: 2,
      }
    );
    if (userProfile.matchedCount == 0) {
      throw new CustomError("User not found or User not verified.", 404);
    }
    //generate token
    const token = jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: "30d" });
    return token;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    // input validation
    if (!email || !password) {
      throw new CustomError("Email and Password are required.", 400);
    }
    //validating email
    if (!validateEmail(email)) {
      throw new CustomError("Invalid Email Format.", 400);
    }

    //authenticating
    const fetchUser = await User.findOne({ userEmail: email }, "password");
    console.log(fetchUser);
    if (!fetchUser) {
      throw new CustomError("User does not exist.", 404);
    }
    const storedHashedPassword = fetchUser.password;

    //compare plain password to storedHashedPassword
    const isMatch = await bcrypt.compare(password, storedHashedPassword);
    if (!isMatch) {
      throw new CustomError("Wrong password.", 401);
    }

    //generate token
    const token = jwt.sign({ id: fetchUser._id }, process.env.SECRETKEY, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    throw error;
  }
};

const authServices = {
  generateAndSendEmailOtp,
  verifyEmailOtp,
  registerUserEmail,
  registerUserProfile,
  loginUser,
};

export { authServices };

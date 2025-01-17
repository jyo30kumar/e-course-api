import jwt from "jsonwebtoken";
import { CustomError } from "../utils/customError.js";
import { hashString } from "../utils/hashString.js";
import { otpService } from "../utils/otpService.js";
import { validateEmail } from "../utils/validator.js";
import "dotenv/config";
import { User } from "../database/models/User.model.js";

const generateAndSendEmailOtp = ({ email }) => {
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

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("OTP : ", otp);

    // send otp to email
    otpService.sendOtpEmail(email, otp);

    //generate token
    const token = jwt.sign({ email, otp }, process.env.SECRETKEY, {
      expiresIn: "25m",
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
    isVerify:1,
  });
  try {
    const data = await newUser.save({ validateBeforeSave: false });
    return { success: true, id: data._id };
  } catch (error) {
    throw error;
  }
};

const registerUser = async ({ firstName, lastName, email, password }) => {
  try {
    //hashing password
    const hashedPassword = await hashString(password);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const authServices = {
  generateAndSendEmailOtp,
  verifyEmailOtp,
  registerUserEmail,
  registerUser,
};

export { authServices };

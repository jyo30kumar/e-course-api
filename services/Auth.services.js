import jwt from "jsonwebtoken";
import { CustomError } from "../utils/customError.js";
import { hashString } from "../utils/hashString.js";
import { otpService } from "../utils/otpService.js";
import { validateEmail } from "../utils/validator.js";
import "dotenv/config";

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
      expiresIn: "5m",
    });

    return token;
  } catch (error) {
    console.error(error.stack);
    throw error;
  }
};

const verifyEmailOtp = (verifiedUser, activeUser) => {
  console.log("OTP from token:", verifiedUser.otp);
  console.log("OTP By User:", activeUser.otp);

  try {
    if (!activeUser.otp) {
      console.error("OTP is not provided");
      throw new CustomError("OTP is required.", 400);
    }
    if (verifiedUser.otp != activeUser.otp) {
      throw new CustomError("Invalid OTP", 400);
    }
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const registerUser = async ({ firstName, lastName, email, password }) => {
  try {
    //hashing password
    const hashedPassword = await hashString(password);
    return hashedPassword;
  } catch (error) {
    console.error(error.stack);
    throw error;
  }
};

const authServices = {
  generateAndSendEmailOtp,
  verifyEmailOtp,
  registerUser,
};

export { authServices };

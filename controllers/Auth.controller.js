import { authServices as services } from "../services/Auth.services.js";

const sendEmailOtp = async (req, res, next) => {
  try {
    const token = services.generateAndSendEmailOtp(req.body);
    res.status(200).json({ token, message: "OTP sent successfully." });
  } catch (error) {
    next(error);
  }
};

const verifyEmailOtp = (req, res, next) => {
  try {
    const result = services.verifyEmailOtp(req.otpVerifyData, req.body);
    res.status(200).json({ message: "User is Authorized" });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const response = await services.registerUser(req.body);
    res.status(201).json({
      message: "User Registered Successfully",
      hashedPassword: response,
    });
  } catch (error) {
    next(error);
  }
};

const authController = {
  sendEmailOtp,
  verifyEmailOtp,
  register,
};

export { authController };

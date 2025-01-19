import { authServices as services } from "../services/Auth.services.js";

const sendEmailOtp = async (req, res, next) => {
  try {
    const token = services.generateAndSendEmailOtp(req.body);
    res
      .status(200)
      .json({ token, success: true, message: "OTP sent successfully." });
  } catch (error) {
    next(error);
  }
};

const verifyEmailOtp = async (req, res, next) => {
  try {
    const result = services.verifyEmailOtp(
      req.data["otp"],
      req.body["otp"]
    );
    if (result) {
      const result = await services.registerUserEmail(
        req.data["email"]
      );
      if (result.success) {
        res.status(200).json({ success: true, id: result["id"] });
      }
    }
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const response = await services.registerUserProfile(req.body);
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      query: response,
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

import { authServices as services } from "../services/Auth.services.js";

const sendEmailOtp = async (req, res, next) => {
  try {
    const token = await services.generateAndSendEmailOtp(req.body["email"]);
    res
      .status(200)
      .json({ token, success: true, message: "OTP sent successfully." });
  } catch (error) {
    next(error);
  }
};

const verifyEmailOtp = async (req, res, next) => {
  try {
    const result = services.verifyEmailOtp(req.data["otp"], req.body["otp"]);
    if (result) {
      const result = await services.registerUserEmail(req.data["email"]);
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
      token: response,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await services.loginUser(email, password);
    if (result) {
      res.status(200).json({ success: true, token: result });
    }
  } catch (error) {
    next(error);
  }
};

const authController = {
  sendEmailOtp,
  verifyEmailOtp,
  register,
  login,
};

export { authController };

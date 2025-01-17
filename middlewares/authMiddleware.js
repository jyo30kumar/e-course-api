import jwt from "jsonwebtoken";
import "dotenv/config";
import { CustomError } from "../utils/customError.js";

const verifyJwtTokenForEmailOtp = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRETKEY, (err, data) => {
      if (err) {
        throw new CustomError("Invalid or Expired Token", 401);
      }
      req.otpTokenData = data;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export { verifyJwtTokenForEmailOtp };

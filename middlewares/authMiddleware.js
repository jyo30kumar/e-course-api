import jwt from "jsonwebtoken";
import "dotenv/config";
import { CustomError } from "../utils/customError.js";

const verifyJwtToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRETKEY, (err, data) => {
      if (err) {
        throw new CustomError("Invalid or Expired Token", 401);
      }
      req.otpVerifyData = data;
      next();
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { verifyJwtToken };

import jwt from "jsonwebtoken";
import "dotenv/config";
import { CustomError } from "../utils/customError.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRETKEY, (err, tokenData) => {
      if (err) {
        throw new CustomError("Invalid or Expired Token", 401);
      }
      req.data = tokenData;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export { authMiddleware };

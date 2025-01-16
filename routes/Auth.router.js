import { Router } from "express";
import { authController as controller } from "../controllers/Auth.controller.js";
import { verifyJwtToken as authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/send-email-otp", controller.sendEmailOtp);
authRouter.post("/verify-email-otp", authMiddleware, controller.verifyEmailOtp);
authRouter.post("/register", controller.register);

export {authRouter};
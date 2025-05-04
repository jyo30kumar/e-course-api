import { Router } from "express";
import { authController as controller } from "../controllers/Auth.controller.js";
import { authMiddleware } from "../middlewares/Auth.middleware.js";

const authRouter = Router();

authRouter.post("/send-email-otp", controller.sendEmailOtp);
authRouter.post("/verify-email-otp", authMiddleware, controller.verifyEmailOtp);
authRouter.post("/register", controller.register);
authRouter.post("/login", controller.login);
authRouter.post("/logout", controller.logout)

export {authRouter};
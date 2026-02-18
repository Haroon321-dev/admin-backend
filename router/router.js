import express from "express";
const router = express.Router();

import * as controller from "../controller/auth-controller.js";
import { signupSchema, loginSchema } from "../validators/validator.js";
import validation from "../middlewares/validate-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { loginLimiter } from "../utils/login.limit.js";

router.route("/").get(controller.home);

router.route("/register").post(validation(signupSchema), controller.register);

router.route("/login").post(loginLimiter, validation(loginSchema), controller.login);

router.route("/google").post(controller.googleAuth);

router.route("/logout").post(controller.logout);

router.route("/user").get(authMiddleware, controller.user);

// router.route("/forgot-password").post(controller.forgotPassword);

// router.route("/reset-password/:token").post(controller.resetPasswordController);

router.route("/forgot-password-otp").post(controller.forgotPasswordOtp);

router.route("/reset-password-otp").post(controller.resetPasswordWithOtp);

export default router;

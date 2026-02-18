import {
    registerUser,
    loginUser,
    logoutUser,
    getUserData,
    // forgotPasswordService,
    // resetPasswordService,
    forgotPasswordOtpService,
    resetPasswordWithOtpService,
} from "../services/auth.service.js";
import User from "../models/user-model.js";
import validatePassword from "../validators/passwordValidator.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to Home Page!");
    } catch (error) {
        console.error(error);
    }
};

/**---------------------------------------------------------------------------- */

const register = async (req, res) => {
    try {
        const { user, token } = await registerUser(req.body);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully!",
            userId: user._id.toString(),
            token, //token added for testing in swagger
        });
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || "Internal Server Error" 
        });
    }
};

/**---------------------------------------------------------------------------- */

const login = async (req, res) => {
    try {
        const { user, token } = await loginUser(req.body);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login Successful!",
            userId: user._id.toString(),
            token,    //token added for testing in swagger
        });

    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || "Internal Server Error" 
        });
    }
};


/**--------------------------------------------------------------------------- */

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Google token required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload.email_verified) {
      return res.status(400).json({ message: "Email not verified by Google" });
    }

    const { email, name, sub } = payload;

    let user = await User.findOne({ email });

    // If user exists but no googleId → link account
    if (user && !user.googleId) {
      user.googleId = sub;
      await user.save();
    }

    // If user doesn't exist → create new
    if (!user) {
      user = await User.create({
        email,
        name,
        googleId: sub,
      });
    }

    const jwtToken = await user.generateToken();

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // same as login
    });

    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      userId: user._id.toString(),
    });

  } catch (error) {
    res.status(401).json({ message: "Google login failed" });
  }
};

/**---------------------------------------------------------------------------- */

const logout = async (req, res) => {
    try {
        await logoutUser();
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ 
            success: true, message: "Logout successful" 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Internal Server Error"
        });
    }
};

/**---------------------------------------------------------------------------- */

const user = async (req, res) => {
    try {
        const userData = await getUserData(req.user._id);
        res.status(200).json({ 
            success: true, userData 
        });
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || "Internal Server Error" 
        });
    }
};

/**---------------------------------------------------------------------------- */

const forgotPassword = async (req, res) => {
    try {
        await forgotPasswordService(req.body.email, process.env.CLIENT_URL);
        res.status(200).json({ 
            success: true, message: "Password reset email sent" 
        });
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || "Internal Server Error" 
        });
    }
};

/**---------------------------------------------------------------------------- */

const resetPassword = async (req, res) => {
    try {
        await resetPasswordService(req.params.token, req.body.password);
        res.status(200).json({ 
            success: true, message: "Password reset successful" 
        });
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || "Internal Server Error" 
        });
    }
};

/*-------------------- Reset Password Validator Controller ----------------------*/

const resetPasswordController = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const validationError = validatePassword(password);
        if (validationError) {
            return res.status(400).json({ 
                message: validationError 
            });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token",
            });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ 
            message: "Password reset successful" 
        });

    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ 
            message: "Internal server error" 
        });
    }
};

/**-------------------------------------------------------------------- */

const forgotPasswordOtp = async (req, res) => {
    try {
        await forgotPasswordOtpService(req.body.email);
        res.status(200).json({
            success: true,
            message: "OTP sent to your email",
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Internal Server Error",
        });
    }
};

/**--------------------------------------------------------------------- */

const resetPasswordWithOtp = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        await resetPasswordWithOtpService(email, otp, password);

        res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Internal Server Error",
        });
    }
};


export {
    home,
    register,
    login,
    googleAuth,
    logout,
    user,
    // forgotPassword,
    // resetPassword,
    // resetPasswordController,
    forgotPasswordOtp,
    resetPasswordWithOtp,
};

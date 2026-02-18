import User from "../models/user-model.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import { resetPasswordTemplate } from "../utils/resetPasswordTemplate.js";

export const registerUser = async ({ username, email, phone, password }) => {
    const userExist = await User.findOne({ email });
    if (userExist) throw { status: 400, message: "Email already exist!" };

    const userCreated = await User.create({ username, email, phone, password });
    const token = await userCreated.generateToken();

    return { user: userCreated, token };
};

/**-------------------------------------------------------------------- */

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw { status: 400, message: "Invalid Credentials!" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { status: 401, message: "Invalid Email or Password!" };

    const token = await user.generateToken();
    return { user, token };
};

/**-------------------------------------------------------------------- */

export const logoutUser = async () => {
    // Controller will handle cookie clearing
    return true;
};

/**--------------------------------------------------------------------- */

export const getUserData = async (userId) => {
    const userData = await User.findById(userId);
    if (!userData) throw { status: 404, message: "User not found" };
    return userData;
};

/**---------------------------------------------------------------------- */

// export const forgotPasswordService = async (email, clientUrl) => {
//     const user = await User.findOne({ email });
//     if (!user) throw { status: 404, message: "User not found" };

//     const resetToken = crypto.randomBytes(32).toString("hex");

//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
//     await user.save();

//     const resetLink = `${clientUrl}/reset-password/${resetToken}`;

//     await sendEmail({
//         to: user.email,
//         subject: "Reset Your Password",
//         html: resetPasswordTemplate(user.name, resetLink),
//     });

//     return true;
// };

/**---------------------------------------------------------------------- */

// export const resetPasswordService = async (token, newPassword) => {
//     const user = await User.findOne({
//         resetPasswordToken: token,
//         resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) throw { status: 400, message: "Invalid or expired token" };

//     user.password = newPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();
//     return true;
// };

/**--------------------Forgot Password OTP Service------------------------ */

export const forgotPasswordOtpService = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw { status: 404, message: "User not found" };

    // 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // hash OTP
    const hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    user.resetOtp = hashedOtp;
    user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await sendEmail({
        to: user.email,
        subject: "Password Reset OTP",
        html: `
            <h2>Password Reset OTP</h2>
            <p>Your OTP is:</p>
            <h1>${otp}</h1>
            <p>This OTP is valid for 10 minutes.</p>
        `,
    });

    return true;
};

/**---------------------Reset Password OTP Service-------------------------- */

export const resetPasswordWithOtpService = async (
    email,
    otp,
    newPassword
) => {
    const hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    const user = await User.findOne({
        email,
        resetOtp: hashedOtp,
        resetOtpExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw { status: 400, message: "Invalid or expired OTP" };
    }

    user.password = newPassword;
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;

    await user.save();
    return true;
};

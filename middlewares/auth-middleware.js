import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized HTTP, Token not provided!"
            });
        }

        const isVerified = jwt.verify(token, process.env.JWT_KEY);

        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });

        if (!userData) {
            return res.status(401).json({
                message: "Unauthorized: User not found!",
            });
        }

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();

    } catch (error) {
        //res.clearCookie("token");
        res.status(401).json({
            message: "Unauthorized, Invalid or expired token!"
        });
    }
};

export default authMiddleware;



// const authMiddleware = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Token expired" });
//   }
// };

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
    },
    password: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    resetOtp: String,
    resetOtpExpires: Date,
    // resetPasswordToken: String,
    // resetPasswordExpires: Date,
  },
  { timestamps: true }
);

/*------------------ Hash the Password ---------------------*/
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/*--------------------- JSON Web Token ----------------------*/
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "2m" }
    );
  } catch (error) {
    console.error(error);
  }
};

const User = mongoose.model("User", userSchema);

export default User;



import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role:{
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }
  },
  { timestamps: true },
);

//hash password before saving to database
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.error("Error hashing password", error);
  }
});

//compare password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//generate JWT token
userSchema.methods.generateJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const userModel = mongoose.model("user", userSchema);

export default userModel;

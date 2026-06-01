import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import apiError from "../utils/apiError.js";
import userModel from "../models/auth.model.js";

// service to register a user
export const registerService = async (userData) => {
  //check for all required fields
  if (!userData.name || !userData.email || !userData.password) {
    throw new apiError(404, "All fields are required");
  }

  //check if user already exists
  let existingUser = await userModel.findOne({ email: userData.email });

  if (existingUser) {
    throw new apiError(400, "User already exists");
  }

  //create new user and save the user to database
  let newUser = await userModel.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role || "user",
  });

  // create JWT token for the user
  let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { user: newUser, token };
};

//service to login a user
export const loginService = async (userData) => {
  //check for all required fields
  if (!userData.email || !userData.password) {
    throw new apiError(404, "All fields are required");
  }

  //check if user already exists
  let existingUser = await userModel.findOne({ email: userData.email });
  if (!existingUser) {
    throw new apiError(400, "User not found. please register first");
  }

  //compare password
  let isPasswordCorrect = await existingUser.comparePassword(userData.password);

  if (!isPasswordCorrect) throw new apiError(401, "Invalid credentials");

  // create JWT token for the user
  let token = existingUser.generateJWTToken();

  return { user: existingUser, token };
};

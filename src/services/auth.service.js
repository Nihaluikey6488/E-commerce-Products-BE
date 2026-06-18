import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import userModel from "../models/auth.model.js";
import { generateAccessToken } from "../utils/token.js";

// service to register a user
export const registerService = async (userData) => {
   const { name, email, password, role } = userData;
  //check for all required fields
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
// Check if name is less than 3 characters long
  if(name.trim().length<3) throw new ApiError(400,"Name should be at least 3 characters long")
// check if password is less than 6 characters long
  if(password.length<6) throw new ApiError (400,"Password should be at least 6 characters long")
  //check if user already exists
  const existingUser = await userModel.findOne({email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  //create new user and save the user to database
  const  newUser = await userModel.create({
    name,email,password,role
  });

  // create JWT token for the user
  const token =await generateAccessToken(newUser._id)

  return { user: newUser, token };
};  

//service to login a user
export const loginService = async (userData) => {
  //check for all required fields
  if (!userData.email || !userData.password) {
    throw new ApiError(404, "All fields are required");
  }

  //check if user already exists
  const existingUser = await userModel.findOne({ email: userData.email });
  if (!existingUser) {
    throw new ApiError(400, "User not found. please register first");
  }

  //compare password
  const isPasswordCorrect = await existingUser.comparePassword(userData.password);

  if (!isPasswordCorrect) throw new ApiError(401, "Invalid credentials");

  // create JWT token for the user
  const token = await generateAccessToken(existingUser._id);

  return { user: existingUser, token };
};

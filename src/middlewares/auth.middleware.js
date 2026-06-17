import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import userModel from "../models/auth.model.js";

// authentication middleware
export const authAdminMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError(401, "Token not found");

  const user =  jwt.verify(token, process.env.JWT_SECRET);
  if (!user) throw new ApiError(401, "Unauthorized user");



  // check if the user is an admin or not from db
    const userData= await userModel.findById(user.id);
    // check if the user not found
    if(!userData) throw new ApiError(404,"User not found")
    if(userData.role !== "admin"){
        throw new ApiError(403, "Forbidden. Admins only");
    }

  req.user = userData;

  next();
});

export const authUserMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError(401, "Token not found");

  const user =  jwt.verify(token, process.env.JWT_SECRET);
  if (!user) throw new ApiError(401, "Unauthorized user");

  req.user = user;

  next();
});


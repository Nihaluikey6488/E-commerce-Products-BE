import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";

// authentication middleware
export const authAdminMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) throw new apiError(401, "Token not found");

  let user = await jwt.verify(token, process.env.JWT_SECRET);
  if (!user) throw new apiError(401, "Unauthorized user");

  // check if the user is an admin
  if (user.role !== "admin") {
    throw new apiError(403, "Access denied. Admin only.");
  }

  req.user = user;

  next();
});

export const authUserMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) throw new apiError(401, "Token not found");

  let user = await jwt.verify(token, process.env.JWT_SECRET);
  if (!user) throw new apiError(401, "Unauthorized user");

  req.user = user;

  next();
});


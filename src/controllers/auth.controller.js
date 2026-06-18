import asyncHandler from "../utils/asyncHandler.js";
import { registerService, loginService } from "../services/auth.service.js";
import ApiRespons from "../utils/apiResponse.js";
import ApiResponse from "../utils/apiResponse.js";

// controller to register a user
export const registerController = asyncHandler(async (req, res) => {
  // register the user and get the user and token
  const { user, token } = await registerService(req.body);

  // set token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  // send response to the client
  return res
    .status(201)
    .json(new ApiResponse("User registered successfully", { user, token }));
});

// controller to login a user
export const loginController = asyncHandler(async (req, res) => {
  let userData = req.body;
  // call the login service to login the user
  let { user, token } = await loginService(userData);

  // set token in cookie
  res.cookie("token", token,{
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  // send response to the client
  return res
    .status(201)
    .json(new ApiResponse("User logged in successfully", { user, token }));
});

import asyncHandler from "../utils/asyncHandler.js";
import { registerService, loginService } from "../services/auth.service.js";
import ApiRespons from "../utils/apiResponse.js";
import ApiResponse from "../utils/apiResponse.js";

// controller to register a user
export const registerController = asyncHandler(async (req, res, next) => {
  let { name, email, password, role } = req.body;

  let userData = { name, email, password, role };
  // register the user and get the user and token
  let { user, token } = await registerService(userData);

  // set token in cookie
  res.cookie("token", token);

  // send response to the client
  res.status(201).json(new ApiResponse("User registered successfully",{user,token}));
});

// controller to login a user
export const loginController = asyncHandler(async (req, res) => {
  let userData = req.body;
  // call the login service to login the user
  let { user, token } = await loginService(userData);

  // set token in cookie
  res.cookie("token", token);

  // send response to the client
  res.status(201).json(new ApiResponse("User logged in successfully",{user,token}));
});

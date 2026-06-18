import jwt from "jsonwebtoken";

/**
 * Generate access token for authentication
 */
export const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
/**
 * Utility wrapper to handle errors in async route handlers.
 * Automatically catches rejected promises and forwards errors to Express error middleware.
 *
 * @param {Function} requestHandler - Async route handler function (req, res, next)
 * @returns {Function} Express middleware function
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    // Wrap async function and catch any errors
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export default asyncHandler;
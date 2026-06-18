/**
 * Custom error class for handling API errors in a consistent way.
 * Extends the built-in JavaScript Error class.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (e.g. 400, 404, 500)
   * @param {string} message - Error message to be sent in response
   */
  constructor(statusCode, message) {
    // Call parent Error class constructor with message
    super(message);

    // HTTP status code for response handling
    this.statusCode = statusCode;
  }
}

export default ApiError;
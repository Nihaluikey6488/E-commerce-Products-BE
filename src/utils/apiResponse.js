/**
 * Standard API response class to maintain consistent response structure.
 */
class ApiResponse {
  /**
   * @param {string} message - Success message to send in response
   * @param {any} data - Optional payload/data returned from API
   */
  constructor(message, data = null) {
    // Indicates the request was successful
    this.success = true;

    // Human-readable success message
    this.message = message;

    // Actual response data (can be object, array, etc.)
    this.data = data;
  }
}

export default ApiResponse;


##  Detailed Changes Applied

- **Naming / Style:** `PascalCase` applied for classes and exported utilities; fixed inconsistent filenames and names for readability and maintainability. See [src/utils/apiError.js](src/utils/apiError.js) and [src/utils/asyncHandler.js](src/utils/asyncHandler.js).

- **Async handling:** Simplified promise handlers to `.catch(next)` where applicable by using a central `asyncHandler` utility to improve readability and reduce boilerplate.

- **Response formatting:** Centralized success responses into a reusable `ApiResponse` utility. Controllers now return structured responses with data wrapped in an object, e.g. `res.status(200).json(new ApiResponse("Product updated successfully", { product }))` instead of passing raw values.

- **Status codes:** Fixed incorrect HTTP status codes across controllers:
  - `create` operations now return `201 Created` (was `200`).
  - Validation / bad request cases use `400 Bad Request` instead of `404` for missing/invalid input.
  - Normalized status usages in the `register` controller and other endpoints.

- **Auth controller / cookies:** Removed unnecessary object creation in authentication flows and added a token size/limit and `maxAge` when setting cookies to improve security and session handling.

- **Middleware fixes:**
  - Removed unused `next` parameter in `register` controller where it was not used.
  - Added a user-existence check in `auth.middleware` to avoid processing requests for deleted users.
  - Removed unnecessary `await` from `jwt.verify()` in `userAuthMiddleware` to avoid awaiting a non-promise.

- **Service layer cleanup:**
  - Removed redundant `return await` in `getItemsService` to simplify async returns.
  - Replaced unnecessary `else` blocks with early `return` in `addToCartService` to reduce nesting and improve readability.
  - Replaced generic `Error` with `ApiError` for consistent error handling (e.g. `decreaseCartService`).
  - Corrected cart-item deletion logic so items are removed only when quantity reaches zero (prevents premature deletion when quantity is 1).

- **Product updates:** Product existence is now checked before initiating image uploads in update flows to avoid wasted uploads and partial side-effects.

- **Delete product controller:** Removed an unnecessary local `product` variable in the delete flow to simplify the code path.

- **Commit hygiene:** Noted several improper or unclear commits around custom files and middleware (e.g., multer-related changes). Recommend squashing or improving commit messages.

- **Documentation:** Added JSDoc comments and short docs for utilities to explain `success`, `message`, and `data` fields returned by `ApiResponse` for developer clarity and team onboarding.

- **Auth separation of concerns:** Moved JWT token generation out of the user model into a dedicated token utility to reduce coupling and increase reusability.

---

##  Review Note
Please review this PR carefully for consistency, edge cases, and alignment with existing architecture.
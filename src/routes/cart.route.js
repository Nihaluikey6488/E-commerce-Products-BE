import { Router } from "express";
import { addToCartController, getCartItemsController } from "../controllers/cart.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";


let cartRouter = Router();

/**
 * @description Get all products in the cart
 * @route GET /api/cart/
 * @access Private
 */
cartRouter.get("/", authUserMiddleware ,getCartItemsController);

/**
 * @description Add a product to the cart
 * @route POST /api/cart/
 * @access Private
 */
cartRouter.post("/", authUserMiddleware, addToCartController);


export default cartRouter;

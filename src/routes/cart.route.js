import { Router } from "express";
import { getCartItemsController } from "../controllers/cart.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";


let cartRouter = Router();

/**
 * @description Get all products in the cart
 * @route GET /api/cart/
 * @access Private
 */
cartRouter.get("/", authUserMiddleware ,getCartItemsController);



export default cartRouter;

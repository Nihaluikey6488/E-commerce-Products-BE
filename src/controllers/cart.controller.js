import { getCartItemsService, addToCartService } from "../services/cart.service.js";



export const getCartItemsController = async (req, res) => {
    // get userId from params
    const { id } = req.user;

    // get cart items for the user from the service
    const cartItems = await getCartItemsService(id);

    res.status(200).json({
        success: true,
        message: "Cart items retrieved successfully",
        data: cartItems,
    });
  
};

export const addToCartController = async (req, res) => {
    
    const { id } = req.user;
    const { productId, quantity } = req.body;

    // add to cart using the service
    const cartItem = await addToCartService(id, productId, quantity);

    res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        data: cartItem,
    });
};
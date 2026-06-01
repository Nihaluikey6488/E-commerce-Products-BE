import { getCartItemsService } from "../services/cart.service.js";



export const getCartItemsController = async (req, res) => {
    // get userId from params
    const { userId } = req.user;

    // get cart items for the user from the service
    const cartItems = await getCartItemsService(userId);

    res.status(200).json({
        success: true,
        message: "Cart items retrieved successfully",
        data: cartItems,
    });
  
};
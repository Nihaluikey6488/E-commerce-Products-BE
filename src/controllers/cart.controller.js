import { getCartItemsService, addToCartService , decreaseCartItemService} from "../services/cart.service.js";


/***
 * Controller to get cart items for a user
 * GET /api/cart/
 */
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

/***
 * Controller to add a product to the cart
 * POST /api/cart/
 */
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


/***
 * Controller to decrease a product from the cart or remove it if quantity becomes 0
 * PATCH /api/cart/
 */ 
export const decreaseCartItemController = async (req, res) => {
    
    const { id } = req.user;
    const { productId } = req.body;

    // decrease cart item using the service
    const cartItem = await decreaseCartItemService(id, productId);
    
    res.status(200).json({
        success: true,
        message: "Cart item updated successfully",
        data: cartItem,
    });
    
}
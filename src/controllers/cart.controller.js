import { getCartItemsService, addToCartService , decreaseCartItemService} from "../services/cart.service.js";
import ApiResponse from "../utils/apiResponse.js";


/***
 * Controller to get cart items for a user
 * GET /api/cart/
 */
export const getCartItemsController = async (req, res) => {
    // get userId from params
    const { id } = req.user;

    // get cart items for the user from the service
    const cartItems = await getCartItemsService(id);

   
    res.status(200).json(new ApiResponse("Cart items retrieved successfully",{cartItems}));


  
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

// add to cart response
    res.status(201).json(new ApiResponse("Product added to cart successfully",{cartItem}))
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
    
 
    // decrease cart item response
    res.status(200).json(new ApiResponse("Product quantity decreased or removed from the cart successfully",{cartItem}))
}
import cartModel from "../models/cart.model.js";
import ApiError from "../utils/apiError.js";

// service to get cart items for a user
export const getCartItemsService = async (userId) => {
  // get cart items for the user
return  cartModel
    .find({ userId })
    .populate("productId", "name price images")
    
 
};

// service to add a product to the cart
export const addToCartService = async (userId, productId, quantity) => {
  // check if the product is already in the cart
  const existingCartItem = await cartModel.findOne({ userId, productId });

  if (existingCartItem) {
    // if the product is already in the cart, update the quantity
    existingCartItem.quantity += quantity;
    await existingCartItem.save();
    return existingCartItem;
  } 
    // if the product is not in the cart, create a new cart item
    return cartModel.create({ userId, productId, quantity });
  
  
};

// service to decrease a product from the cart or remove it if quantity becomes 0
export const decreaseCartItemService = async (
  userId,
  productId
) => {
  const cartItem = await cartModel.findOne({
    userId,
    productId,
  });

  if (!cartItem) {
    throw new ApiError(404, "Item not found in cart");
  }

  cartItem.quantity -= 1;

  if (cartItem.quantity <= 0) {
    await cartModel.findOneAndDelete({
      userId,
      productId,
    });

    return null;
  }

  await cartItem.save();

  return cartItem;
};
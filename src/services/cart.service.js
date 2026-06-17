import cartModel from "../models/cart.model.js";

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
export const decreaseCartItemService = async (userId, productId) => {
  // find the cart item
  let cartItem = await cartModel.findOne({ userId, productId });

  if (!cartItem) {
    throw new Error("Item not found in cart");
  }

  // decrease the quantity
  cartItem.quantity -= 1;
  
  if (cartItem.quantity <= 1) {
    // if quantity is 0 or less, remove the item from the cart
    await cartModel.findOneAndDelete({ userId, productId });
  } else {
    await cartItem.save();
  }

  return cartItem;
};

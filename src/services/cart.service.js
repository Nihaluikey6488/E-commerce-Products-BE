import cartModel from "../models/cart.model.js";

// service to get cart items for a user
export const getCartItemsService = async (userId) => {
  // get cart items for the user
  let cartItems = await cartModel
    .find({ userId })
    .populate("productId", "name price images")
    .exec();
  return cartItems;
};

// service to add a product to the cart
export const addToCartService = async (userId, productId, quantity) => {
  // check if the product is already in the cart
  let existingCartItem = await cartModel.findOne({ userId, productId });

  if (existingCartItem) {
    // if the product is already in the cart, update the quantity
    existingCartItem.quantity += quantity;
    await existingCartItem.save();
    return existingCartItem;
  } else {
    // if the product is not in the cart, create a new cart item
    let newCartItem = await cartModel.create({ userId, productId, quantity });
    return newCartItem;
  }
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

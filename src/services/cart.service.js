import cartModel from "../models/cart.model.js";


export const getCartItemsService = async (userId) => {
  // get cart items for the user
  let cartItems = await cartModel.find({ userId }).populate("productId");
  return cartItems;
}
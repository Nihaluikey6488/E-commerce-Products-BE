import cartModel from "../models/cart.model.js";


export const getCartItemsService = async (userId) => {
  // get cart items for the user
  let cartItems = await cartModel.find({ userId }).populate("productId", "name price images").exec();
  return cartItems;
}

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
}
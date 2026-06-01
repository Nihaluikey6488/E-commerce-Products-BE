import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        products:[{
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            }
        }],
    },
    { timestamps: true },
);

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
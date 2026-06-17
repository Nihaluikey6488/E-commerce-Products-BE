import ApiError from "../utils/ApiError.js";
import sendFilesToImageKit from "../config/imagekit.js";
import productModel from "../models/products.model.js";
import mongoose from "mongoose";

// service to create a new product
export const createProductService = async (productData, userId, images) => {
  let { name, description, price, category } = productData;

  // check if all fields are required
  if (!name || !price) {
    throw new ApiError(400, "All fields are required");
  }

  // check if images are required
  if (!images || images.length === 0) {
    throw new ApiError(400, "At least one image is required");
  }

  // send images to imagekit and get the image urls
  let imageUrls = [];
  for (let image of images) {
    const uploaded = await sendFilesToImageKit(
      image.buffer,
      image.originalname,
    );
    imageUrls.push(uploaded.url);
  }

  // create a new product on db
  let product = await productModel.create({
    name,
    description,
    price,
    category,
    images: imageUrls,
    userId: userId,
  });
  return product;
};

// service to get all products
export const getAllProductsService = async (category) => {
  let query = {};
  if (category) {
    query.category = category;
  }
  // find all products and populate the userId field with the name of the user
  let products = await productModel.find(query).populate("userId", "name");
  return products;
};

// service to get a product by id
export const getProductByIdService = async (id) => {
  // check if the id is a valid mongoose object id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product id");
  }
  // find the product by id and populate the userId field with the name of the user
  let product = await productModel.findById(id).populate("userId", "name");
  // check if the product is found
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  // return the product
  return product;
};

// service to update a product by id


export const updateProductByIdService = async (id, productData, images = []) => {
  // 1. Validate ObjectId early
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product id");
  }

  // 2. Check product exists BEFORE doing expensive work
  const existingProduct = await productModel.findById(id);
  if (!existingProduct) {
    throw new ApiError(404, "Product not found");
  }

  // 3. Upload images in parallel (faster)
  let imageUrls = [];
  if (images.length > 0) {
    imageUrls = await Promise.all(
      images.map(async (image) => {
        const uploaded = await sendFilesToImageKit(
          image.buffer,
          image.originalname
        );
        return uploaded.url;
      })
    );
  }

  // 4. Merge images safely (optional logic)
  const updatedData = {
    ...productData,
    ...(imageUrls.length > 0 && { images: imageUrls }),
  };

  // 5. Update product and return NEW document
  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedProduct;
};

// service to delete a product by id
export const deleteProductByIdService = async (id) => {
  // check if the id is a valid mongoose object id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product id");
  }
  // delete the product by id
  let product = await productModel.findByIdAndDelete(id);
  // check if the product is found or not
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  // return the product
  return product;
};

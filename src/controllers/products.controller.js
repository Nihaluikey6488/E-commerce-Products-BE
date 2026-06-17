import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
} from "../services/products.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// controller to create a new product
export const createProductController = asyncHandler(async (req, res) => {
  let productData = req.body;
  let images = req.files;
  let product = await createProductService(productData, req.user.id, images);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product: product,
  });
});

// controller to get all products
export const getAllProductsController = asyncHandler(async (req, res) => {
  // get the category from the query parameters
  const { category } = req.query;
  // get all products by category
  let products = await getAllProductsService(category);
  // send response to the client

  res
    .status(200)
    .json(new ApiResponse("Products fetched successfully", { products }));
});

// controller to get a product by id
export const getProductByIdController = asyncHandler(async (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;
  // get product by id
  let product = await getProductByIdService(id);
  // send response to the client

  res
    .status(200)
    .json(new ApiResponse("Product fetched successfully", { product }));
});

// controller to update a product by id
export const updateProductByIdController = asyncHandler(async (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;
  // get the product data from the request body
  const productData = req.body;
  // get the images from the request files
  const images = req.files;
  // update product by id
  let product = await updateProductByIdService(id, productData, images);
  // send response to the client
 

  res.status(200).json(new ApiResponse("Product updated successfully",{product}))
});

// controller to delete a product by id
export const deleteProductByIdController = asyncHandler(async (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;
  // delete product by id
  let product = await deleteProductByIdService(id);
  // send response to the client

  res.status(200).json(new ApiResponse("Product deleted successfully"));
});

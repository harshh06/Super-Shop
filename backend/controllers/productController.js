import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @description Fetch all Products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  //throw new Error("Some Error");
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found " });
  }
});

export { getProducts, getProductById };

import Product from "../models/productModel.js";
import ErrorHandler from "../utils/handleError.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return next(new ErrorHandler(messages.join(", "), 400));
    }

    return next(new ErrorHandler("Server error. Please try again later.", 500));
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return next(new ErrorHandler("No products found.", 404));
    }

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return next(new ErrorHandler("Server error. Please try again later.", 500));
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return next(new ErrorHandler("Product not found.", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return next(new ErrorHandler(messages.join(", "), 400));
    }

    return next(new ErrorHandler("Server error. Please try again later.", 500));
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return next(new ErrorHandler("Product not found.", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return next(new ErrorHandler("Server error. Please try again later.", 500));
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return next(new ErrorHandler("Product not found.", 404));
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    return next(new ErrorHandler("Server error. Please try again later.", 500));
  }
};

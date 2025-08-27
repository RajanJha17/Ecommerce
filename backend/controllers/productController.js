import Product from "../models/productModel.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import ErrorHandler from "../utils/handleError.js";

// Create Product
export const createProduct = async (req, res, next) => {
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
export const getProducts = async (req, res, next) => {
  try {
    const resultsPerPage = Number(req.query.limit) || 4;

    // Start query
    const apiFeatures = new APIFunctionality(Product.find(), req.query)
      .search()
      .filter();

    // Count total matching products (without pagination)
    const productCount = await apiFeatures.query.clone().countDocuments();

    // Now apply pagination
    apiFeatures.pagination(resultsPerPage);

    const totalPages = Math.ceil(productCount / resultsPerPage);
    const page = Number(req.query.page) || 1;

    if (page > totalPages && productCount > 0) {
      return next(new ErrorHandler("This page does not exist.", 404));
    }

    // Fetch paginated products
    const products = await apiFeatures.query;

    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        products: [],
        productCount: 0,
        totalPages: 0,
        message: "No products found"
      });
    }

    return res.status(200).json({
      success: true,
      count: products.length,   // products in this page
      products,
      productCount,             // total products matching filters
      totalPages
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return next(new ErrorHandler("Server error. Please try again later.", 500));
  }
};





export const updateProduct = async (req, res, next) => {
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

export const deleteProduct = async (req, res, next) => {
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

export const getProductDetails = async (req, res, next) => {
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

export const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching admin products:", error.message);
    return next(new ErrorHandler("Server error. Please try again later.", 500));
  }
};


export const createProductReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const productId = req.params.id;

        // Validate user input
        if (!rating || !comment) {
            return next(new ErrorHandler("Please provide all fields.", 400));
        }

        // Find product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return next(new ErrorHandler("Product not found.", 404));
        }

        // Check if user has already reviewed the product
        const existingReview = product.reviews.find(
            (review) => review.user.toString() === req.user.id
        );
        if (existingReview) {
            return next(new ErrorHandler("You have already reviewed this product.", 400));
        }

        // Add new review
        const newReview = {
            user: req.user.id,
            name: req.user.name,
            rating,
            comment
        };
        product.reviews.push(newReview);
        product.numOfReviews = product.reviews.length;

        // Calculate average rating
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.numOfReviews;

        await product.save();

        return res.status(201).json({
            success: true,
            message: "Review added successfully."
        });
    } catch (error) {
        console.error("Error creating product review:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
}

export const getProductReviews = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return next(new ErrorHandler("Product not found.", 404));
        }

        return res.status(200).json({
            success: true,
            reviews: product.reviews
        });
    } catch (error) {
        console.error("Error fetching product reviews:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
};


export const deleteProductReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { reviewId } = req.body;

        // Find product by ID
        const product = await Product.findById(id);
        if (!product) {
            return next(new ErrorHandler("Product not found.", 404));
        }

        // Find review by ID
        const review = product.reviews.find((r) => r._id.toString() === reviewId);
        if (!review) {
            return next(new ErrorHandler("Review not found.", 404));
        }

        // Check if user is authorized to delete the review
        if (review.user.toString() !== req.user.id) {
            return next(new ErrorHandler("You are not authorized to delete this review.", 403));
        }

        // Remove review from product
        product.reviews = product.reviews.filter((r) => r._id.toString() !== reviewId);
        product.numOfReviews = product.reviews.length;

        // Calculate new average rating
        product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.numOfReviews;

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting product review:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
};

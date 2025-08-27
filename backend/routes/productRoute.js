import express from 'express';
import { createProduct, createProductReview, deleteProduct, deleteProductReview, getAdminProducts, getProductDetails, getProductReviews, getProducts, updateProduct } from '../controllers/productController.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';

const productRouter=express.Router();

productRouter.route("/products").get(getProducts);
productRouter.route("/admin/products").get(verifyUserAuth,roleBasedAccess('admin'),getAdminProducts);
productRouter.route("/admin/products").post(createProduct);
productRouter.route("/admin/products/:id").put(verifyUserAuth,roleBasedAccess('admin'),updateProduct);
productRouter.route("/admin/products/:id").delete(verifyUserAuth,roleBasedAccess('admin'),deleteProduct);
productRouter.route("/products/:id").get(getProductDetails);
productRouter.route("/products/:id/review").post(verifyUserAuth, createProductReview);
productRouter.route("/products/:id/reviews").get(getProductReviews);
productRouter.route("/products/:id/review").delete(verifyUserAuth, deleteProductReview);

export default productRouter;

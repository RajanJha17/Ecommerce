import express from 'express';
import { createProduct, deleteProduct, getProductDetails, getProducts, updateProduct } from '../controllers/productController.js';

const productRouter=express.Router();

productRouter.route("/products").get(getProducts).post(createProduct);
productRouter.route("/products/:id").put(updateProduct);
productRouter.route("/products/:id").delete(deleteProduct);
productRouter.route("/products/:id").get(getProductDetails);

export default productRouter;

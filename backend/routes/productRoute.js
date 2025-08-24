import express from 'express';
import { createProduct, getProducts, updateProduct } from '../controllers/productController.js';

const productRouter=express.Router();

productRouter.route("/products").get(getProducts).post(createProduct);
productRouter.route("/products/:id").put(updateProduct);

export default productRouter;

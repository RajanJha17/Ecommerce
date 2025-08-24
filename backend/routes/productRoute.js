import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';

const productRouter=express.Router();

productRouter.route("/products").get(getProducts).post(createProduct)

export default productRouter;

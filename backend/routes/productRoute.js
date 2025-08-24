import express from 'express';
import { getProducts } from '../controllers/productController.js';

const productRouter=express.Router();

productRouter.route("/product").get(getProducts)

export default productRouter;

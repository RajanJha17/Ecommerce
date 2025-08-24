import express from 'express';

const productRouter=express.Router();

productRouter.route("/product").get()

export default productRouter;

import Product from "../models/productModel.js";


export const createProduct=async(req,res)=>{
    const {name,price,description,category,stock,image}=req.body;

    try {
        const product=await Product.create({
            name,
            price,
            description,
            category,
            stock,
            image
        });

        res.status(201).json({
            success:true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

export const getProducts=async(req,res)=>{
    try {
        const products=await Product.find();

        res.status(200).json({
            success:true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
import mongoose from "mongoose";


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[7,"Price must be less than 7 characters"]
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[5,"Stock must be less than 5 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
                min:1,
                max:5
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    colors: [{ type: String }],
  sizes: [
    {
      size: { type: String, required: true },
      stock: { type: Number, required: true, default: 0 }
    }
  ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Product=mongoose.model("Product",productSchema);

export default Product;
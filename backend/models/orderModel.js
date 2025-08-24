
import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [{

        name:{
            type: String,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }],
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        }
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    totalPrice: {
        type: Number,
        default:0,
        required: true
    },
    taxPrice: {
        type: Number,
        default: 0,
        required: true
    },
    shippingPrice:{
        type: Number,
        default: 0,
        required: true
    },
    orderStatus: {
        type: String,
        default: "Processing",
        required: true
    },
    deliveredAt:Date,
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

import e from "express";
import Order from "../models/orderModel.js";
import ErrorHandler from "../utils/handleError.js";


export const createNewOrder = async (req, res,next) => {
    const {
        orderItems,
        shippingInfo,
        paymentInfo,
        totalPrice,
        taxPrice,
        shippingPrice,
        orderStatus,
        deliveredAt,
        isPaid,
        paidAt
    } = req.body;

    try {
        const newOrder = new Order({
            user:req.user._id,
            orderItems,
            shippingInfo,
            paymentInfo,
            totalPrice,
            taxPrice,
            shippingPrice,
            orderStatus,
            deliveredAt,
            isPaid,
            paidAt:Date.now()
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: newOrder
        });
    } catch (error) {
          console.error("Error fetching products:", error.message);
    return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
};


export const getSingleOrder = async (req, res,next) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate("user", "name email");

        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error("Error fetching order:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
};

export const getAllMyOrders = async (req, res,next) => {
    const userId = req.user._id;

    try {
        const orders = await Order.find({ user: userId });

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
};

export const getAllOrders = async (req, res,next) => {
    try {
        const orders = await Order.find()
        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.totalPrice;
        });
        res.status(200).json({
            success: true,
            orders,
            totalAmount
        });
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
};

async function updateQuantity(productId, quantity) {
    const product = await Product.findById(productId);
    product.stock -= quantity;
    await product.save();
}

export const updateOrderStatus = async (req, res,next) => {
    const { id } = req.params;
    const { orderStatus } = req.body;

    try {
        const order = await Order.findById(id);

        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        if(order.orderStatus === "Delivered"){
            return next(new ErrorHandler("Order is already delivered", 400));
        }

        order.orderStatus = orderStatus;
        if (orderStatus === "Delivered") {
            order.deliveredAt = Date.now();
        }

        await Promise.all(order.orderItems.map(async (item) => {
            updateQuantity(item.product, item.quantity);
        }));
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        });
    } catch (error) {
        console.error("Error updating order status:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
};

export const deleteOrder = async (req, res,next) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);

        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        if(order.orderStatus !== "Delivered"){
            return next(new ErrorHandler("Order is not delivered yet and cannot be deleted", 400));
        }

        await order.deleteOne(id);

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting order:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
};

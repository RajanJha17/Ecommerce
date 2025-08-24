import express from 'express';
import { createNewOrder, deleteOrder, getAllMyOrders, getAllOrders, getSingleOrder, updateOrderStatus } from '../controllers/orderController.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
const orderRouter=express.Router();


orderRouter.route("/new/order").post(verifyUserAuth, createNewOrder);
orderRouter.route("/admin/order/:id").get(verifyUserAuth, roleBasedAccess("admin"),getSingleOrder);
orderRouter.route("/my/orders").get(verifyUserAuth, getAllMyOrders);
orderRouter.route("/admin/orders").get(verifyUserAuth, roleBasedAccess("admin"), getAllOrders);
orderRouter.route("/admin/order/:id").put(verifyUserAuth, roleBasedAccess("admin"), updateOrderStatus);
orderRouter.route("/admin/order/:id").delete(verifyUserAuth, roleBasedAccess("admin"), deleteOrder);


export default orderRouter;
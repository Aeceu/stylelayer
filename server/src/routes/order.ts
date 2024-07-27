import express from "express";
import { createOrder, getOrderById, getOrders, getUserOrders } from "../controllers/order";

const router = express.Router();

router.get("/orders", getOrders);
router.get("/order/user/:userId", getUserOrders);
router.get("/order/:userId", getOrderById);
router.post("/order/:userId", createOrder);

export default router;

import express from "express";
import {
  createOrder,
  getOrderById,
  getOrderByStatus,
  getOrders,
  getUserOrders,
  updateOrder,
} from "../controllers/order";

const router = express.Router();

router.get("/orders", getOrders);
router.get("/order/user/:userId", getUserOrders);
router.get("/order/:userId", getOrderById);
router.post("/order/:userId", createOrder);

router.post("/order/status/:userId", getOrderByStatus);
router.patch("/order/status/:orderId", updateOrder);

export default router;

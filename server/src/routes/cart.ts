import express from "express";
import { addToCart, deleteFromCart, getCartByUserId } from "../controllers/cart";

const router = express.Router();

router.get("/cart/:userId", getCartByUserId);
router.post("/cart/:userId", addToCart);
router.delete("/cart/:cartItemId", deleteFromCart);

export default router;

import express from "express";
import { addToCart, deleteFromCart, getCartByUserId } from "../controllers/cart";

const router = express.Router();

router.get("/cart/:userId", getCartByUserId);
router.post("/cart/:userId", addToCart);
router.delete("/cart/:cartId/:cartItemId", deleteFromCart);

export default router;

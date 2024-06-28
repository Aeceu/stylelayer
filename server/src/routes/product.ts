import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProductInformation,
  updateProductStock,
} from "../controllers/product";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:productId", getProductById);
router.post("/product", createProduct);
router.delete("/product/:productId", deleteProduct);
router.patch("/product/:productId", updateProductInformation);
router.patch("/product/stock/:productId", updateProductStock);

export default router;

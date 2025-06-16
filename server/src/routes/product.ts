import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategories,
  getProductById,
  getSearchByCategory,
  updateProductInformation,
  updateProductStock
} from "../controllers/product";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:productId", getProductById);
router.post("/product", createProduct);
router.delete("/product/:productId", deleteProduct);
router.patch("/product/:productId", updateProductInformation);
router.patch("/product/stock/:productId", updateProductStock);

router.get("/categories", getCategories);
router.get("/search", getSearchByCategory);

export default router;

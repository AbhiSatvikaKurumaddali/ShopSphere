// routes/productRoutes.js
import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { getMyProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/", protect, authorize("seller"), addProduct);
router.get("/", getProducts);
router.get("/mine", protect, authorize("seller"), getMyProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, authorize("seller"), updateProduct);
router.delete("/:id", protect, authorize("seller", "admin"), deleteProduct);

export default router;

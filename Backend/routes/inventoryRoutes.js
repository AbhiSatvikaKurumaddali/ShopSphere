// routes/inventoryRoutes.js
import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { updateStock } from "../controllers/inventoryController.js";

const router = express.Router();

// Seller updates stock
router.put("/stock", protect, authorize("seller"), updateStock);

export default router;

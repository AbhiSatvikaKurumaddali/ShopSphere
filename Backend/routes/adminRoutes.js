// routes/adminRoutes.js
import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  getDashboardStats,
  getAllUsers,
  getSalesByCategory,
  getMonthlyRevenue,
  getSellerPerformance
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect, authorize("admin"), getDashboardStats);
router.get("/users", protect, authorize("admin"), getAllUsers);
router.get("/sales/category", protect, authorize("admin"), getSalesByCategory);
router.get("/sales/monthly", protect, authorize("admin"), getMonthlyRevenue);
router.get("/sellers/performance", protect, authorize("admin"), getSellerPerformance);

export default router;

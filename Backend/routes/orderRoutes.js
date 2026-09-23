// routes/orderRoutes.js
import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { placeOrder, getMyOrders, updateOrderStatus, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/myorders", protect, getMyOrders);
router.put("/:id/status", protect, authorize("admin", "seller"), updateOrderStatus);
router.get("/", protect, authorize("admin"), getAllOrders);

export default router;

// routes/deliveryRoutes.js
import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { assignDelivery, updateDeliveryStatus, getMyDeliveries } from "../controllers/deliveryController.js";

const router = express.Router();

router.post("/assign", protect, authorize("admin"), assignDelivery);
router.put("/:id/status", protect, authorize("delivery"), updateDeliveryStatus);
router.get("/mydeliveries", protect, authorize("delivery"), getMyDeliveries);

export default router;

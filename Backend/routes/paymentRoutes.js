// routes/paymentRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { initiatePayment, updatePaymentStatus } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/initiate", protect, initiatePayment);
router.put("/:id/status", protect, updatePaymentStatus);

export default router;

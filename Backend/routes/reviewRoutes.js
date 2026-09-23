// routes/reviewRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addReview, getProductReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/:productId", protect, addReview);
router.get("/:productId", getProductReviews);

export default router;

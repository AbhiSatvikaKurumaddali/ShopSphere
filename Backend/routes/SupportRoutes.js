// routes/supportRoutes.js
import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { createTicket, getMyTickets, updateTicketStatus, assignTicket } from "../controllers/supportController.js";

const router = express.Router();

router.post("/", protect, createTicket);
router.get("/mytickets", protect, getMyTickets);
router.put("/:id/status", protect, updateTicketStatus);
router.put("/:id/assign", protect, authorize("support", "admin"), assignTicket);

export default router;

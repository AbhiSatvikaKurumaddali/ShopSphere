// routes/ticketRoutes.js
import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import ticketControllerFactory from "../controllers/ticketController.js";

const router = express.Router();

// These routes expect a ticketController instance to be created in server bootstrap
// Example usage in server.js:
//   import ticketControllerFactory from "./controllers/ticketController.js";
//   const ticketController = ticketControllerFactory(io);
//   app.use("/api/tickets", ticketRoutes(ticketController));
//
// To keep routes generic, export a function that accepts a controller instance.

const createTicketRoutes = (ticketController) => {
  const r = express.Router();

  r.post("/", protect, ticketController.createTicket);
  r.put("/:id", protect, ticketController.updateTicket);
  r.put("/:id/assign", protect, authorize("admin", "support"), ticketController.assignAgent);

  return r;
};

export default createTicketRoutes;

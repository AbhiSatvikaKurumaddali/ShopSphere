// controllers/ticketController.js
import Ticket from "../models/Ticket.js";

export default function ticketController(io) {
  return {
    createTicket: async (req, res) => {
      try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        if (io) io.emit("ticketCreated", ticket);
        res.json(ticket);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },

    updateTicket: async (req, res) => {
      try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .populate("customer assignedAgent");
        if (io) io.emit("ticketUpdated", ticket);
        res.json(ticket);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },

    assignAgent: async (req, res) => {
      try {
        const ticket = await Ticket.findByIdAndUpdate(
          req.params.id,
          { assignedAgent: req.body.agentId },
          { new: true }
        ).populate("customer assignedAgent");
        if (io) io.emit("ticketAssigned", ticket);
        res.json(ticket);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  };
}

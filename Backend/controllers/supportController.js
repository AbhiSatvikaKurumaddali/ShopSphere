// controllers/supportController.js
import SupportTicket from "../models/SupportTicket.js";

// Create a ticket
export const createTicket = async (req, res) => {
  try {
    const ticket = new SupportTicket({
      user: req.user._id,
      subject: req.body.subject,
      description: req.body.description,
        priority: req.body.priority || "medium",
      status: "Open"
    });
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: "Failed to create ticket", error: error.message });
  }
};

// Get logged-in user's tickets
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ user: req.user._id });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets", error: error.message });
  }
};

// Update ticket status
export const updateTicketStatus = async (req, res) => {
  try {
    const query = req.user.role === "customer" ? { _id: req.params.id, user: req.user._id } : { _id: req.params.id };
    const ticket = await SupportTicket.findOne(query);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = req.body.status || ticket.status;
    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: "Failed to update ticket", error: error.message });
  }
};

// Assign ticket to staff
export const assignTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.assignedTo = req.body.assignedTo;
    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: "Failed to assign ticket", error: error.message });
  }
};

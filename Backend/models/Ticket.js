// models/Ticket.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["open", "pending", "resolved", "closed"],
      default: "open"
    },
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;

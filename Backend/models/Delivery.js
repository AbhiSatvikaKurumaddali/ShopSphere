// models/Delivery.js
import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["Assigned", "In Transit", "Delivered", "Cancelled"],
      default: "Assigned"
    },
    trackingInfo: { type: String, default: null }
  },
  { timestamps: true }
);

const Delivery = mongoose.model("Delivery", deliverySchema);
export default Delivery;

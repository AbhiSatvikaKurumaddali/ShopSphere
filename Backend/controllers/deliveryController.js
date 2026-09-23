// controllers/deliveryController.js
import Delivery from "../models/Delivery.js";

// Assign delivery to agent
export const assignDelivery = async (req, res) => {
  try {
    const delivery = new Delivery({
      order: req.body.orderId,
      assignedTo: req.body.assignedTo,
      status: "Assigned"
    });
    const savedDelivery = await delivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    res.status(500).json({ message: "Failed to assign delivery", error: error.message });
  }
};

// Update delivery status
export const updateDeliveryStatus = async (req, res) => {
  try {
    const delivery = req.user.role === "delivery"
      ? await Delivery.findOne({ _id: req.params.id, assignedTo: req.user._id })
      : await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ message: "Delivery not found" });

    delivery.status = req.body.status || delivery.status;
    const updatedDelivery = await delivery.save();
    res.json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ message: "Failed to update delivery", error: error.message });
  }
};

// Get deliveries for logged-in agent
export const getMyDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ assignedTo: req.user._id }).populate("order");
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch deliveries", error: error.message });
  }
};

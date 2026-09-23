// controllers/paymentController.js
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import { createNotification } from "./notificationController.js";

// Initiate payment
export const initiatePayment = async (req, res) => {
  try {
    const { orderId, method } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const payment = await Payment.create({
      order: orderId,
      method,
      status: method === "COD" ? "success" : "pending",
      transactionId: method === "COD" ? `COD-${Date.now()}` : null
    });

    await createNotification(order.customer, `Payment initiated via ${method}`, "order");
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findById(req.params.id).populate("order");
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = status;
    payment.transactionId = `TXN-${Date.now()}`;
    await payment.save();

    await createNotification(payment.order.customer, `Payment ${status}`, "order");
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

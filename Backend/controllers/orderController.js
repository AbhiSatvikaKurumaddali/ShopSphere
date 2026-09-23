// controllers/orderController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

// Place a new order
export const placeOrder = async (req, res) => {
  try {
    const requestedItems = Array.isArray(req.body.items) ? req.body.items : [];
    if (!requestedItems.length) return res.status(400).json({ message: "At least one product is required" });
    const address = req.body.shippingAddress;
    if (!address?.address || !address?.city || !address?.postalCode || !address?.country) {
      return res.status(400).json({ message: "Complete shipping address is required" });
    }

    const productIds = requestedItems.map((item) => item.product || item.productId);
    if (productIds.some((id) => !mongoose.isValidObjectId(id))) {
      return res.status(400).json({ message: "One or more cart products are no longer available. Please refresh your cart." });
    }
    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) return res.status(400).json({ message: "One or more products are unavailable" });

    const items = requestedItems.map((item) => {
      const product = products.find((entry) => entry._id.toString() === String(item.product || item.productId));
      const quantity = Number(item.quantity);
      if (!Number.isInteger(quantity) || quantity < 1) throw new Error("Quantity must be a positive whole number");
      if (product.stock < quantity) throw new Error(`${product.name} does not have enough stock`);
      product.stock -= quantity;
      return { product: product._id, name: product.name, price: product.price, quantity, seller: product.seller };
    });
    await Promise.all(products.map((product) => product.save()));
    const itemsPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxPrice = Math.round(itemsPrice * 0.05 * 100) / 100;
    const shippingPrice = itemsPrice >= 1500 ? 0 : 99;
    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress: address,
      paymentMethod: req.body.paymentMethod || "COD",
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice: itemsPrice + taxPrice + shippingPrice,
      status: "Pending"
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

// Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Update order status (admin/seller)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (req.user.role === "seller" && !order.items.some((item) => String(item.seller) === String(req.user._id))) {
      return res.status(403).json({ message: "You can only update your own order items" });
    }

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders", error: error.message });
  }
};

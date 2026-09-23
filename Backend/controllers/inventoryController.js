// controllers/inventoryController.js
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Seller updates stock manually
export const updateStock = async (req, res) => {
  try {
    const { productId, stock } = req.body;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this product" });
    }

    product.stock = stock;
    await product.save();
    res.json({ message: "Stock updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Auto-decrement stock when order is placed
export const decrementStockOnOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate("items.product");
    if (!order) return;

    for (const item of order.items) {
      const product = await Product.findById(item.product._id);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }
  } catch (error) {
    console.error("Error updating stock:", error.message);
  }
};

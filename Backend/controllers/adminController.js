// controllers/adminController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();
    res.json({ usersCount, ordersCount, productsCount });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats", error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// Sales by category
export const getSalesByCategory = async (req, res) => {
  try {
    const sales = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category",
          totalSales: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
        }
      }
    ]);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Monthly revenue
export const getMonthlyRevenue = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $group: { _id: { $month: "$createdAt" }, total: { $sum: "$totalPrice" } } },
      { $sort: { "_id": 1 } }
    ]);
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seller performance
export const getSellerPerformance = async (req, res) => {
  try {
    const performance = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.seller",
          totalSales: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "sellerDetails"
        }
      },
      { $unwind: "$sellerDetails" },
      { $project: { sellerName: "$sellerDetails.name", totalSales: 1 } }
    ]);
    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

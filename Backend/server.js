// server.js
import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";

import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import createTicketRoutes from "./routes/ticketRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import chatControllerFactory from "./controllers/chatController.js";
import ticketControllerFactory from "./controllers/ticketController.js";
import { seedDemoCatalog } from "./utils/seedDemoData.js";
import cors from "cors";

app.use(cors({
  origin: "https://frontend-indol-psi-76.vercel.app",
  credentials: true
}));


dotenv.config();

const app = express();
const server = http.createServer(app);

const requiredEnvironment = ["MONGO_URI", "JWT_SECRET"];
const missingEnvironment = requiredEnvironment.filter((name) => !process.env[name]);

if (missingEnvironment.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvironment.join(", ")}`);
}

if (process.env.JWT_SECRET === "yourSecretKeyHere") {
  throw new Error("JWT_SECRET must be changed from the default placeholder");
}

// Middlewares
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "connecting" });
});

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/chat", chatRoutes);

// Socket.io controllers
const io = chatControllerFactory(server);
const ticketController = ticketControllerFactory(io);

// Ticket routes require controller instance
app.use("/api/tickets", createTicketRoutes(ticketController));

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI) // ✅ removed deprecated options
  .then(() => {
    return seedDemoCatalog().then(() => server.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    }));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Export io for other modules (e.g., notificationController)
export default io;

// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import TicketDashboard from "./pages/TicketDashboard.jsx";
import SupportChat from "./components/SupportChat.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import SellerDashboard from "./pages/SellerDashboard.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";
import DeliveryDashboard from "./pages/DeliveryDashboard.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<ProtectedRoute roles={["customer", "seller", "admin"]}><Orders /></ProtectedRoute>} />

          {/* Role-based dashboards */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller"
            element={
              <ProtectedRoute roles={["seller"]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <ProtectedRoute roles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delivery"
            element={
              <ProtectedRoute roles={["delivery"]}>
                <DeliveryDashboard />
              </ProtectedRoute>
            }
          />

          {/* Shared routes */}
          <Route
            path="/tickets"
            element={
                <ProtectedRoute roles={["admin", "support", "customer"]}>
                <TicketDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:ticketId"
            element={
                <ProtectedRoute roles={["admin", "support", "customer"]}>
                <SupportChat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

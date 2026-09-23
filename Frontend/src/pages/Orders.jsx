import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { formatCurrency } from "../utils/currency.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/orders/myorders").then(({ data }) => setOrders(data)).catch((reason) => setError(reason.response?.data?.message || "Unable to load orders")); }, []);
  return <main className="simple-page orders-page"><p className="eyebrow">Your account</p><h1>Orders</h1>{error && <p className="form-error">{error}</p>}{!orders.length && !error && <p>No orders yet. Your next find is waiting.</p>}{orders.map((order) => <article className="order-card" key={order._id}><div><strong>Order #{order._id.slice(-6).toUpperCase()}</strong><p>{new Date(order.createdAt).toLocaleDateString()} · {order.items.length} items</p></div><div><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span><strong>{formatCurrency(order.totalPrice)}</strong></div></article>)}</main>;
}

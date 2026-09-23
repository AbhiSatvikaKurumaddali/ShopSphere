import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [message, setMessage] = useState("");
  const load = () => api.get("/delivery/mydeliveries").then(({ data }) => setDeliveries(data)).catch(() => setMessage("Unable to load assigned deliveries"));
  useEffect(() => { load(); }, []);
  const updateStatus = async (id, status) => { try { await api.put(`/delivery/${id}/status`, { status }); load(); } catch (error) { setMessage(error.response?.data?.message || "Unable to update delivery"); } };
  return <main className="dashboard-page"><p className="eyebrow">Delivery partner</p><h1>Assigned deliveries</h1>{message && <p className="form-error">{message}</p>}<section className="delivery-list">{deliveries.map((delivery) => <article className="order-card" key={delivery._id}><div><strong>Order #{delivery.order?._id?.slice(-6).toUpperCase() || "-"}</strong><p>{delivery.order?.shippingAddress?.city || "Address unavailable"}</p></div><div className="delivery-actions"><span className="status">{delivery.status}</span><select value={delivery.status} onChange={(event) => updateStatus(delivery._id, event.target.value)}><option>Assigned</option><option>In Transit</option><option>Delivered</option><option>Cancelled</option></select></div></article>)}{!deliveries.length && <p className="muted">No deliveries have been assigned yet.</p>}</section></main>;
}

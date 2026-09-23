import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function TicketDashboard() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/support/mytickets").then(({ data }) => setTickets(data)).catch((reason) => setError(reason.response?.data?.message || "Unable to load tickets")); }, []);
  return <main className="simple-page"><p className="eyebrow">Customer care</p><h1>Support tickets</h1>{error && <p className="form-error">{error}</p>}{tickets.map((ticket) => <article className="order-card" key={ticket._id}><div><strong>{ticket.subject}</strong><p>{ticket.description}</p></div><span className="status">{ticket.status}</span></article>)}{!tickets.length && !error && <p className="muted">You have no support tickets.</p>}</main>;
}

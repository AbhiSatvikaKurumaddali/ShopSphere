// components/TicketDashboard.jsx
import React, { useState, useEffect } from "react";

export default function TicketDashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // TODO: fetch tickets from backend /api/tickets
    setTickets([{ id: 1, subject: "Order issue", status: "open" }]);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Tickets</h2>
      <ul>
        {tickets.map((t) => (
          <li key={t.id} className="border p-2 mb-2">
            <div>Subject: {t.subject}</div>
            <div>Status: {t.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

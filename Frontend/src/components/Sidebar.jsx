// components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 space-y-2">
      <Link to="/dashboard" className="block p-2 hover:bg-gray-200">Dashboard</Link>
      <Link to="/tickets" className="block p-2 hover:bg-gray-200">Tickets</Link>
      <Link to="/support" className="block p-2 hover:bg-gray-200">Support</Link>
    </aside>
  );
}

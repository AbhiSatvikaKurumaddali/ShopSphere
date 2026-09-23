// pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    useEffect(() => { Promise.all([api.get("/admin/dashboard"), api.get("/admin/users")]).then(([statsResponse, usersResponse]) => { setStats(statsResponse.data); setUsers(usersResponse.data); }); }, []);
    return <main className="dashboard-page"><p className="eyebrow">Platform control</p><h1>ShopSphere overview</h1><div className="stats-grid">{[["Users", stats?.usersCount], ["Orders", stats?.ordersCount], ["Products", stats?.productsCount]].map(([label, value]) => <div className="stat-card" key={label}><span>{label}</span><strong>{value ?? "-"}</strong></div>)}</div><section className="admin-section"><div className="dashboard-heading"><h2>Recent users</h2><span>{users.length} total</span></div>{users.slice(0, 8).map((user) => <div className="user-row" key={user._id}><span>{user.name}</span><span>{user.email}</span><b>{user.role}</b></div>)}</section></main>;
}

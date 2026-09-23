// components/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (error) {
      window.alert(error.response?.data?.message || "Unable to create account");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <p className="eyebrow">Join the marketplace</p>
      <h1>Create account</h1>
      <input
        type="text"
        placeholder="Name"
        className="w-full border p-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2">
        Register
      </button>
      <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
    </form>
  );
}

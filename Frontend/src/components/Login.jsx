// components/Login.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data, data.token);
      navigate(`/${data.role}`);
    } catch (error) {
      window.alert(error.response?.data?.message || "Unable to sign in");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <p className="eyebrow">Welcome back</p>
      <h1>Sign in</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2">
        Login
      </button>
      <p className="auth-switch">New to ShopSphere? <Link to="/register">Create an account</Link></p>
    </form>
  );
}

// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="site-nav">
      <Link className="brand" to="/"><span className="brand-mark">S</span>ShopSphere</Link>
      <nav className="nav-links"><Link to="/">Discover</Link><Link to="/cart">Bag ({count})</Link>{user ? <><Link to="/orders">Orders</Link><button className="nav-action" onClick={logout}>Sign out</button></> : <><Link to="/seller">Sell with us</Link><Link to="/login" className="nav-login">Sign in <span>↗</span></Link></>}<NotificationBell /></nav>
    </header>
  );
}

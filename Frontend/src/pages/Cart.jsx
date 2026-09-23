import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatCurrency } from "../utils/currency.js";

export default function Cart() {
  const { items, total, updateQuantity, removeItem, clear } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState({ address: "", city: "", postalCode: "", country: "" });
  const [message, setMessage] = useState("");
  const shipping = total >= 1500 || total === 0 ? 0 : 99;
  const tax = Math.round(total * 0.05 * 100) / 100;

  const submitOrder = async (event) => {
    event.preventDefault();
    if (!user) return navigate("/login");
    try {
      const { data } = await api.post("/orders", { items: items.map((item) => ({ product: item._id, quantity: item.quantity })), shippingAddress: address, paymentMethod: "COD" });
      clear();
      navigate(`/orders?success=${data._id}`);
    } catch (error) { setMessage(error.response?.data?.message || "Unable to place order"); }
  };

  if (!items.length) return <main className="simple-page"><p className="eyebrow">Your bag</p><h1>Your cart is empty</h1><p>Find something useful, beautiful, or both.</p><Link className="primary-button" to="/">Browse products <span>↗</span></Link></main>;
  return <main className="checkout-page"><div><p className="eyebrow">Your bag</p><h1>Ready when you are.</h1>{items.map((item) => <div className="cart-row" key={item._id}><img src={item.images?.[0] || item.image} alt={item.name} /><div><h3>{item.name}</h3><p>{formatCurrency(item.price)} · {item.seller?.name || "Independent maker"}</p><div className="quantity"><button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button><button className="remove" onClick={() => removeItem(item._id)}>Remove</button></div></div><strong>{formatCurrency(item.price * item.quantity)}</strong></div>)}</div><form className="checkout-form" onSubmit={submitOrder}><h2>Delivery details</h2>{["address", "city", "postalCode", "country"].map((field) => <input key={field} required value={address[field]} placeholder={field === "postalCode" ? "Postal code" : field[0].toUpperCase() + field.slice(1)} onChange={(event) => setAddress({ ...address, [field]: event.target.value })} />)}<div className="order-total"><span>Subtotal</span><b>{formatCurrency(total)}</b><span>GST (5%)</span><b>{formatCurrency(tax)}</b><span>Shipping</span><b>{formatCurrency(shipping)}</b><strong>Total</strong><strong>{formatCurrency(total + tax + shipping)}</strong></div>{message && <p className="form-error">{message}</p>}<button className="primary-button" type="submit">Place cash-on-delivery order <span>↗</span></button></form></main>;
}

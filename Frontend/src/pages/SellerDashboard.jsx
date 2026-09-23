// pages/SellerDashboard.jsx
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { formatCurrency } from "../utils/currency.js";

export default function SellerDashboard() {
    const emptyProduct = { name: "", price: "", description: "", category: "general", stock: "" };
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState(emptyProduct);
    const [message, setMessage] = useState("");
    const loadProducts = () => api.get("/products/mine").then(({ data }) => setProducts(data)).catch(() => setMessage("Unable to load your products"));
    useEffect(() => { loadProducts(); }, []);
    const createProduct = async (event) => { event.preventDefault(); try { await api.post("/products", { ...form, price: Number(form.price), stock: Number(form.stock) }); setForm(emptyProduct); setMessage("Product published"); loadProducts(); } catch (error) { setMessage(error.response?.data?.message || "Unable to publish product"); } };
    const removeProduct = async (id) => { await api.delete(`/products/${id}`); loadProducts(); };
    return <main className="dashboard-page"><div className="dashboard-heading"><div><p className="eyebrow">Seller studio</p><h1>Your products</h1></div><p>{products.length} published items</p></div><div className="seller-layout"><form className="dashboard-form" onSubmit={createProduct}><h2>Publish a product</h2>{Object.keys(emptyProduct).map((field) => <input required={field !== "description"} key={field} value={form[field]} type={field === "price" || field === "stock" ? "number" : "text"} placeholder={field[0].toUpperCase() + field.slice(1)} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />)}<button className="primary-button" type="submit">Publish product <span>↗</span></button>{message && <p className="form-note">{message}</p>}</form><div className="seller-products">{products.map((product) => <article className="seller-product" key={product._id}><div><strong>{product.name}</strong><p>{product.category} · {product.stock} in stock</p></div><div><b>{formatCurrency(product.price)}</b><button className="text-button" onClick={() => removeProduct(product._id)}>Remove</button></div></article>)}{!products.length && <p className="muted">Your published products will appear here.</p>}</div></div></main>;
}

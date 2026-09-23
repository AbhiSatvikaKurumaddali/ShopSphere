import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";
import { formatCurrency } from "../utils/currency.js";

const fallbackProducts = [
  { _id: "studio-headphones", name: "Studio Wireless Headphones", category: "Tech", price: 129, seller: "Aural Studio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80" },
  { _id: "linen-chair", name: "Linen Lounge Chair", category: "Home", price: 248, seller: "North & Form", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=80" },
  { _id: "weekend-tote", name: "Everyday Canvas Tote", category: "Style", price: 54, seller: "Morrow Goods", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80" },
  { _id: "ceramic-set", name: "Hand-thrown Table Set", category: "Home", price: 86, seller: "Clay Common", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80" },
];

const categories = ["All", "Tech", "Home", "Style", "Wellness"];

export default function Home() {
  const [products, setProducts] = useState(fallbackProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const { addItem } = useCart();

  useEffect(() => {
    api.get("/products").then(({ data }) => {
      if (Array.isArray(data) && data.length) setProducts(data);
    }).catch(() => {});
  }, []);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesQuery = product.name?.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesQuery && matchesCategory;
  }), [products, query, category]);

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">The independent marketplace</p>
          <h1>Good things,<br /><em>well chosen.</em></h1>
          <p className="hero-description">Discover thoughtful products from ambitious small businesses, all in one considered place.</p>
          <a className="primary-button" href="#catalog">Explore the collection <span>↘</span></a>
        </div>
        <div className="hero-art" aria-label="Curated collection preview">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-card hero-card-back" />
          <div className="hero-card hero-card-front"><img src={fallbackProducts[0].image} alt="Wireless headphones" /></div>
          <span className="hero-note">Curated for<br />the curious</span>
        </div>
      </section>

      <section className="catalog-section" id="catalog">
        <div className="section-heading">
          <div><p className="eyebrow">Browse the edit</p><h2>Made to be found</h2></div>
          <p className="section-meta">{visibleProducts.length} pieces from independent makers</p>
        </div>
        <div className="catalog-tools">
          <div className="category-list">{categories.map((item) => <button className={category === item ? "category active" : "category"} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" /></label>
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => <article className="product-card" key={product._id}>
            <div className="product-image"><img src={product.images?.[0] || product.image || fallbackProducts[0].image} alt={product.name} /><button className="save-button" aria-label={`Save ${product.name}`}>♡</button></div>
            <div className="product-info"><div><p className="product-category">{product.category || "Collection"}</p><h3>{product.name}</h3><p className="seller-name">by {product.seller?.name || product.seller || "Independent maker"}</p></div><strong>{formatCurrency(product.price)}</strong></div>
            <button className="add-button" onClick={() => addItem(product)}>Add to bag</button>
          </article>)}
        </div>
        {!visibleProducts.length && <div className="empty-state">No products match that search yet.</div>}
      </section>

      <section className="maker-banner"><p className="eyebrow">For makers and merchants</p><h2>Your work deserves<br /><em>a wider world.</em></h2><Link className="outline-button" to="/register">Open your shop <span>↗</span></Link></section>
    </main>
  );
}

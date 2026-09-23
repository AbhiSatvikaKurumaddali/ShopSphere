import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("shopsphere-cart") || "[]").filter((item) => /^[a-f\\d]{24}$/i.test(item._id)));
  useEffect(() => localStorage.setItem("shopsphere-cart", JSON.stringify(items)), [items]);
  const addItem = (product) => setItems((current) => {
    const existing = current.find((item) => item._id === product._id);
    return existing ? current.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
  });
  const updateQuantity = (id, quantity) => setItems((current) => current.map((item) => item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  const removeItem = (id) => setItems((current) => current.filter((item) => item._id !== id));
  const clear = () => setItems([]);
  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  return <CartContext.Provider value={{ items, count: items.reduce((sum, item) => sum + item.quantity, 0), total, addItem, updateQuantity, removeItem, clear }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);

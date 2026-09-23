import crypto from "node:crypto";
import User from "../models/User.js";
import Product from "../models/Product.js";

const demoProducts = [
  { name: "Studio Wireless Headphones", category: "Tech", price: 10707, stock: 25, description: "Balanced wireless headphones for focused listening.", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"] },
  { name: "Linen Lounge Chair", category: "Home", price: 20584, stock: 12, description: "A comfortable statement chair for quiet corners.", images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=80"] },
  { name: "Everyday Canvas Tote", category: "Style", price: 4482, stock: 40, description: "A durable everyday carryall made by independent makers.", images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80"] },
  { name: "Hand-thrown Table Set", category: "Home", price: 7138, stock: 18, description: "A handmade ceramic set for daily rituals.", images: ["https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80"] },
];

export async function seedDemoCatalog() {
  if (await Product.exists()) return;
  let seller = await User.findOne({ email: "demo-seller@shopsphere.local" });
  if (!seller) {
    seller = await User.create({ name: "ShopSphere Demo Seller", email: "demo-seller@shopsphere.local", password: process.env.DEMO_SELLER_PASSWORD || crypto.randomUUID(), role: "seller" });
  }
  await Product.insertMany(demoProducts.map((product) => ({ ...product, seller: seller._id })));
  console.log("Demo catalog seeded");
}

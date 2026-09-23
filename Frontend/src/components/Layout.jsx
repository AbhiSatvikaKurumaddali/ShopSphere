// components/Layout.jsx
import React from "react";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

// components/NotificationBell.jsx
import React, { useState } from "react";

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  return (
    <button className="relative">
      🔔
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
          {count}
        </span>
      )}
    </button>
  );
}

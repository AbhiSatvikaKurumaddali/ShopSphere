// components/SupportChat.jsx
import React, { useState } from "react";

export default function SupportChat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;
    setMessages([...messages, { sender: "me", text }]);
    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2 border">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <strong>{m.sender}:</strong> {m.text}
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-600 text-white px-4">
          Send
        </button>
      </div>
    </div>
  );
}

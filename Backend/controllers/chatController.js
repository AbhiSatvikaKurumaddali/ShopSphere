// controllers/chatController.js
import { Server } from "socket.io";
import ChatMessage from "../models/ChatMessage.js";

export default function chatController(server) {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });

  const onlineUsers = new Map(); // userId -> socketId

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinTicket", ({ ticketId, userId }) => {
      socket.join(ticketId.toString());
      onlineUsers.set(userId, socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("typing", ({ sender, ticketId }) => {
      io.to(ticketId.toString()).emit("typing", { sender });
    });

    socket.on("stopTyping", ({ sender, ticketId }) => {
      io.to(ticketId.toString()).emit("stopTyping", { sender });
    });

    socket.on("messageRead", async ({ messageId, reader }) => {
      try {
        const msg = await ChatMessage.findById(messageId);
        if (msg) {
          msg.readBy = [...(msg.readBy || []), reader];
          await msg.save();
          io.to(msg.ticketId.toString()).emit("messageRead", { messageId, reader });
        }
      } catch (err) {
        console.error("Error updating read receipt:", err);
      }
    });

    socket.on("chatMessage", async (msg) => {
      try {
        const chatMsg = new ChatMessage({
          ticketId: msg.ticketId,
          sender: msg.sender,
          receiver: msg.receiver || null,
          text: msg.text,
          fileUrl: msg.fileUrl || null
        });
        await chatMsg.save();
        io.to(msg.ticketId.toString()).emit("chatMessage", chatMsg);
      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
  });

  return io;
}

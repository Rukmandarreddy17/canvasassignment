const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const stateManager = require("./state-manager");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve client
const clientPath = path.join(__dirname, "..", "client");

app.use(express.static(clientPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const roomId = "main-room";

  socket.join(roomId);

  // ✅ CLEAR HISTORY ON EVERY NEW CONNECTION (REFRESH FIX)
  stateManager.clear(roomId);
  console.log("Canvas cleared on refresh/new open");

  // Send empty history
  socket.emit("load_history", []);

  // Drawing
  socket.on("drawing", (data) => {
    data.userId = socket.id;

    stateManager.add(roomId, data);

    socket.to(roomId).emit("drawing", data);
  });

  // Undo
  socket.on("undo", () => {
    stateManager.undo(roomId, socket.id);

    io.to(roomId).emit(
      "load_history",
      stateManager.get(roomId)
    );
  });

  // Cursor
  socket.on("cursor", (data) => {
    socket.to(roomId).emit("cursor", {
      id: socket.id,
      ...data,
    });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);

    socket.to(roomId).emit("user_left", socket.id);
  });
});

// Port (for local + Railway)
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

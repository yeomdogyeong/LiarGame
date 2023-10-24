const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  //방 입장시
  socket.on("createRoom", () => {
    socket.join("newRoom");
    console.log("join room");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4001, () => console.log(`Server listening on port 4001`));

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
// 방에 있는 사용자들의 리스트
let usersInRoom = [];

io.on("connection", (socket) => {
  console.log("새로운 연결 감지");

  //방 입장시
  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId);

    // 사용자 리스트에 현재 사용자 추가
    usersInRoom.push(userId);

    // 방에 있는 모든 사용자에게 사용자 리스트 전송
    io.to(roomId).emit("userJoin", usersInRoom);

    console.log(`${userId}가 ${roomId}에 입장했습니다.`);
  });

  socket.on("disconnect", () => {
    console.log("연결을 해제했습니다");
    // 연결이 끊어진 사용자를 사용자 리스트에서 제거
    usersInRoom = usersInRoom.filter((user) => user !== socket.userId);
  });
});

server.listen(4001, () => console.log(`port 4001`));

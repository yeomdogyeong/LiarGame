import socketIOClient from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ENDPOINT = "http://localhost:4001/"; // 여기에는 실제 서버의 주소를 입력하세요.
const socket = socketIOClient(ENDPOINT);

const Door = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    socket.on("create", (id) => {
      setRoomId(id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const enterRoom = () => {
    if (!userId) {
      alert("이름을 입력해주세요");
      return;
    }

    socket.emit("createRoom");
    navigate(`/room?roomId=${roomId}`);
    console.log("입장누름");
  };

  return (
    <div className="App">
      <h1>이름을 입력하세요</h1>
      <input
        value={userId}
        onChange={handleUserName}
        placeholder="이름을 입력해주세요"
      ></input>
      <button onClick={enterRoom}>입장</button>
    </div>
  );
};

export default Door;

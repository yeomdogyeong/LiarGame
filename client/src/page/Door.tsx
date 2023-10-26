import socketIOClient from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ENDPOINT = "http://localhost:4001/";
const socket = socketIOClient(ENDPOINT);

const Door = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState<string | null>();
  const [userInputs, setUserInputs] = useState<string[]>([""]);

  useEffect(() => {
    socket.on("create", (id) => {
      setRoomId(id);
    });

    socket.on("userJoin", (userList) => {
      setUserInputs(userList);
    });
    window.addEventListener("beforeunload", () => {
      socket.disconnect();
    });
  }, []);

  const handleUserName =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUserInputs = [...userInputs];
      newUserInputs[index] = e.target.value;
      setUserInputs(newUserInputs);
    };

  const addInputFiled = () => {
    setUserInputs([...userInputs, ""]);
  };

  const enterRoom = () => {
    if (!userInputs) {
      alert("이름을 입력해주세요");
      return;
    }

    //방 생성
    socket.emit("createRoom", userInputs);

    const updatedUsers = [...userInputs];

    socket.emit("joinRoom", { roomId, userInputs });
    navigate(`/room?roomId=${roomId}&users=${updatedUsers.join(",")}`);
    console.log("입장누름");
  };

  return (
    <div className="App">
      <h1>이름을 입력하세요</h1>
      {userInputs.map((userId, index) => (
        <input
          key={index}
          value={userId}
          onChange={handleUserName(index)}
          placeholder="이름을 입력해주세요"
        />
      ))}

      <button onClick={enterRoom}>입장</button>
      <button onClick={addInputFiled}>사람 추가하기</button>
    </div>
  );
};

export default Door;

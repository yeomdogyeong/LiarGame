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

    socket.on("create", (id) => {
      setRoomId(id);
      socket.emit("joinRoom", { roomId: id, userInputs });
      navigate(`/room?roomId=${id}&users=${updatedUsers.join(",")}`);
      console.log("입장누름");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        이름을 입력하세요
      </h1>

      <div className="space-y-4 mb-6">
        {userInputs.map((userId, index) => (
          <input
            key={index}
            value={userId}
            onChange={handleUserName(index)}
            placeholder="이름을 입력해주세요"
            className="px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 block w-80"
          />
        ))}
      </div>
      <div className="space-x-4">
        <button
          onClick={enterRoom}
          className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          입장
        </button>
        <button
          onClick={addInputFiled}
          className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          사람 추가하기
        </button>
      </div>
    </div>
  );
};

export default Door;

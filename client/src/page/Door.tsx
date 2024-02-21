import socketIOClient from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

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
    window.addEventListener("unload", () => {
      socket.disconnect();
    });
  }, []);

  const handleUserName =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUserInputs = [...userInputs];
      const soUserInputs = userInputs;
      console.log(soUserInputs);
      console.log(newUserInputs);
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
    <Layout>
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
              placeholder="정한 닉네임을 입력해주세요"
              className="px-4 py-2 border rounded-lg outline-none text-gray-700 block w-80"
            />
          ))}
        </div>
        <div className="space-x-4">
          <button
            onClick={addInputFiled}
            className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-400 hover:bg-red-500 transform hover:scale-95 transition duration-200 ease-in"
          >
            사람 추가하기
          </button>
          <button
            onClick={enterRoom}
            className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 transform hover:scale-95 transition duration-100 ease-in-out"
          >
            입장
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Door;

import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import dummyData from "../dummyData/dummyData";

const Room = () => {
  const location = useLocation();
  const userNames = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("users")?.split(",") || [];
  }, [location.search]);

  const [liar, setLiar] = useState<string | null>(null);
  const [users, setUsers] = useState<{ name: string; isOpen: boolean }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [examples, setExamples] = useState("");

  useEffect(() => {
    const randomData = Math.floor(Math.random() * dummyData.length);
    setTitle(dummyData[randomData].주제);
    setExamples(
      dummyData[randomData].예시[
        Math.floor(Math.random() * dummyData[randomData].예시.length)
      ]
    );
  }, []);

  useEffect(() => {
    if (userNames.length > 0) {
      const randomIndex = Math.floor(Math.random() * userNames.length);
      setLiar(userNames[randomIndex]);
      setUsers(userNames.map((name) => ({ name, isOpen: false })));
    }
  }, [userNames]);

  useEffect(() => {
    const closeAll = () => {
      setUsers(users.map((user) => ({ ...user, isOpen: false })));
    };

    document.addEventListener("click", closeAll);

    return () => {
      document.removeEventListener("click", closeAll);
    };
  }, [users]);

  const openModal = (userName: string) => {
    setSelectedUser(userName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      {users.map((user, idx) => (
        <div
          className="px-6 py-5 my-2 bg-white shadow-lg rounded-2xl flex justify-center items-center cursor-pointer w-1/3 max-w=1/2 transform hover:bg-slate-100"
          key={idx}
          onClick={() => openModal(user.name)}
        >
          <span className="text-gray-800 font-medium">
            {user.name}
            <span className="text-gray-400"> 님</span>
          </span>
          {/* {user.isOpen && (
            <span
              className={`font-semibold ${
                liar === user.name ? "text-red-600" : "text-green-600"
              }`}
            >
              {liar === user.name ? "라이어 🙊" : "일반 시민 👨🏼‍🌾"}
            </span>
          )} */}
        </div>
      ))}
      {isModalOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          onClick={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              ​
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ${
                      liar === selectedUser ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    <h3
                      className="text-lg leading-6 font-medium"
                      id="modal-headline"
                    >
                      {selectedUser} 는
                      {liar === selectedUser ? " 라이어 🙊 " : " 일반 시민 👨🏼‍🌾 "}
                      입니다.
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm">
                        {liar !== selectedUser ? (
                          <>
                            주제는{" "}
                            <span className="text-blue-600">{title}</span>{" "}
                            (이)고 정답은{" "}
                            <span className="text-blue-600">{examples}</span>{" "}
                            입니다
                          </>
                        ) : (
                          <>
                            주제는{" "}
                            <span className="text-blue-600">{title}</span>{" "}
                            입니다
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;

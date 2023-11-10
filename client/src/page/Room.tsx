import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const Room = () => {
  const location = useLocation();
  const userNames = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("users")?.split(",") || [];
  }, [location.search]);

  const [liar, setLiar] = useState<string | null>(null);
  const [users, setUsers] = useState<{ name: string; isOpen: boolean }[]>([]);

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

  const toggleOpen = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setUsers(
      users.map((user, idx) => ({
        ...user,
        isOpen: idx === index ? !user.isOpen : false,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-left p-6">
      {users.map((user, idx) => (
        <div
          className="px-6 py-5 my-2 bg-white shadow-lg rounded-2xl flex justify-between items-center cursor-pointer w-full max-w-md transform hover:bg-slate-100"
          key={idx}
          onClick={(e) => toggleOpen(idx, e)}
        >
          <span className="text-gray-800 font-medium">{user.name}</span>
          {user.isOpen && (
            <span
              className={`font-semibold ${
                liar === user.name ? "text-red-600" : "text-green-600"
              }`}
            >
              {liar === user.name ? "(라이어)" : "(일반 시민)"}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Room;

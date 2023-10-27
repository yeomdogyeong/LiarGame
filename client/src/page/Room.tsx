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
    <div className="App">
      {users.map((user, idx) => (
        <div key={idx} onClick={(e) => toggleOpen(idx, e)}>
          {user.name}
          {user.isOpen &&
            (liar === user.name ? (
              <span>(라이어)</span>
            ) : (
              <span>(일반 시민)</span>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Room;

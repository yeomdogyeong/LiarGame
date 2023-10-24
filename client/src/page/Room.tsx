import { useLocation } from "react-router-dom";

const Room = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const users = queryParams.get("users")?.split(",") || [];

  return (
    <div className="App">
      {users.map((user, idx) => (
        <div key={idx}>{user}</div>
      ))}
    </div>
  );
};

export default Room;

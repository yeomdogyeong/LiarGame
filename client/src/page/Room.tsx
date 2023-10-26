import { useLocation } from "react-router-dom";

const Room = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const users = queryParams.get("users")?.split(",") || [];
  const roomId = queryParams.get("roomId") || "";
  console.log(users);
  const inviteLink = `${window.location.origin}/door?roomId=${roomId}`;

  // 초대 링크를 클립보드에 복사하는 함수
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("초대 링크가 클립보드에 복사되었습니다.");
    });
  };

  return (
    <div className="App">
      {users.map((user, idx) => (
        <div key={idx}>{user}</div>
      ))}
      <div>
        <p>초대 링크: {inviteLink}</p>
        <button onClick={copyToClipboard}>링크 복사</button>
      </div>
    </div>
  );
};

export default Room;

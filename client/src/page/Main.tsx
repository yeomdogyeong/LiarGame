import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const handleEneterButton = () => {
    navigate("/door");
  };

  return (
    <div className="App">
      <h1>Who is Liar?</h1>
      <button onClick={handleEneterButton}>방 입장하기</button>
    </div>
  );
};

export default Main;

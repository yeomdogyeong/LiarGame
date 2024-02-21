import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Main = () => {
  const navigate = useNavigate();

  const handleEneterButton = () => {
    navigate("/door");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <span className="text-3xl text-gray-600 p-4 mb-6">라이어 게임</span>

        <button
          onClick={handleEneterButton}
          className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-300 hover:bg-orange-500 transform hover:scale-95 transition duration-100 ease-in"
        >
          방 입장하기
        </button>
      </div>
    </Layout>
  );
};

export default Main;

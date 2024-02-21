import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200 p-4 inset-x-0 flex items-center justify-center text-gray-500 fixed top-0 font-medium">
      <button
        onClick={() => navigate("/")}
        className="mr-10 pointer-cursor hover:text-orange-600"
      >
        MAIN
      </button>
      <button
        onClick={() => navigate("/door")}
        className="ml-10 pointer-cursor hover:text-blue-400"
      >
        참가자 설정하기
      </button>
    </div>
  );
};

export default Header;

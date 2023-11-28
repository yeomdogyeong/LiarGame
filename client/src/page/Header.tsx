const Header = () => {
  return (
    <div className="bg-gray-50 p-4 inset-x-0 flex items-center justify-center text-gray-500 fixed top-0">
      <button className="mr-10 pointer-cursor hover:text-orange-600">
        MAIN
      </button>
      <button className="ml-10 pointer-cursor hover:text-green-600">
        참가자 설정하기
      </button>
    </div>
  );
};

export default Header;

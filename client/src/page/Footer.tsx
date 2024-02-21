const Footer = () => {
  return (
    <div className="p-4 bg-gray-500 opacity-95 bottom-0 flex items-center justify-end">
      <span className="text-white font-thin mr-6">yeomdogyeong</span>
      <a
        href="https://github.com/yeomdogyeong"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="rounded-full w-10 h-10"
          src="https://github.com/yeomdogyeong.png"
          alt="Profile icon"
        />
      </a>
    </div>
  );
};

export default Footer;

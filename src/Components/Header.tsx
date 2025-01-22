import React from "react";

const Header = () => {
  return (
    <div>
      <div className="flex flex-col">
        {/* Top Bar */}
        <div className="bg-gray-900 text-white py-2 px-4">
          <div className="container mx-auto flex justify-between items-center text-sm">
            <p>Welcome to BM Store!</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">BM Store</h1>
              <div className='hidden items-center gap-5 text-[#000000] sm:flex lg:gap-10 bis_skin_checked="1"flex '>
              <a href="/">
              <div className='menu_btns capitalize'>Home</div>
              </a>
              <a href="#About">About</a>
              <a href="http://localhost:3000/Contact">Contact</a>
            </div>
              <button className="text-blue-500 text-sm">Login / Register</button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;

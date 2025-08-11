import React from 'react';

const DefaultNav = () => {
  return (
    <nav className="w-full bg-white shadow-md top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 로고 */}
          <div className="flex-shrink-0 flex items-center text-xl font-bold text-indigo-600">
            MySite
          </div>

          {/* 메뉴 (PC 화면) */}
          <div className="md:flex space-x-6 items-center">
            <a href="#" className="text-gray-700 hover:text-indigo-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">About</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Services</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Contact</a>
          </div>

          {/* 햄버거 메뉴 (모바일) */}
          <div className="md:hidden flex items-center">
            <button id="menu-button" className="text-gray-700 hover:text-indigo-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DefaultNav;
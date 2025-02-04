import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function Navbar({ isSidebarVisible, toggleSidebar }) {
  const location = useLocation();

  // Page name extraction and formatting
  let pageName = location.pathname.split('/').filter(Boolean).pop();
  if (pageName === 'dashboard') pageName = "home";
  if (pageName === 'tpo') pageName = "TPO";
  pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div
      className={`h-20 sticky top-0 z-10 bg-black text-white flex justify-start items-center border-b-2 border-green-500/20 shadow-lg transition-all duration-300 ${isSidebarVisible ? 'ml-60 px-4' : 'ml-0'}`}
    >
      <button
        className="ml-4 text-white hover:text-green-500"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>
      <span className="ml-8 text-xl text-green-500">
        {pageName}
      </span>
    </div>
  );
}

export default Navbar;

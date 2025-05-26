import React from 'react';

function Footer({ isSidebarVisible }) {
  return (
    <footer className={`bg-black text-white bottom-0 right-0 border-t border-gray-700 shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between items-center p-6 text-sm w-full ${isSidebarVisible ? 'md:ml-60 md:w-[calc(100%-15rem)]' : 'ml-0'}`}>
      
      <div className="flex flex-col md:flex-row md:items-center text-center md:text-left">
        <span className="opacity-80">Built with ❤️ by</span>
        <a href="#" target="_blank" rel="noopener noreferrer" className="ml-1 font-semibold text-green-400 hover:text-green-300 transition">StuMate</a>
      </div>
      
      <div className="opacity-80 mt-2 md:mt-0">&copy; {new Date().getFullYear()} StuMate All Rights Reserved.</div>
      
      <div className="opacity-80 mt-2 md:mt-0 flex items-center gap-1">
        <span>Version</span>
        <span className="font-semibold">1.1.1</span>
      </div>
    </footer>
  );
}

export default Footer;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-black backdrop-blur-xl z-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate("/")} className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-center bg-gradient-to-b from-green-500 to-green-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent">StuMate</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate("/")}
                className="text-xs md:text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/about")}
                className="text-xs md:text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => navigate("/courses")}
                className="text-xs md:text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                Courses
              </button>
              <button
                onClick={() => navigate("/team")}
                className="text-xs md:text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                Our Team
              </button>
              <button
                onClick={() => navigate("/placement")}
                className="text-xs md:text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                Placement
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="text-xs md:text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                Contact Us
              </button>
            </div>

            {/* Sign In & Sign Up Buttons */}
            <div className="flex items-center space-x-4">
              {/* Sign In Dropdown */}
              <div className="relative">
                <button
                  className="text-xs md:text-sm text-white rounded-full bg-green-500 hover:bg-green-600 transition-colors px-4 py-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Sign In
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-white/10 rounded-lg shadow-lg">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500"
                      onClick={() => navigate("/student/login")}
                    >
                      Student
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500"
                      onClick={() => navigate("/admin/login")}
                    >
                      Admin
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500"
                      onClick={() => navigate("/TPO/login")}
                    >
                      TPO Admin
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500"
                      onClick={() => navigate("/management/login")}
                    >
                      Management Admin
                    </button>
                  </div>
                )}
              </div>

              {/* Sign Up Button */}
              <button
                onClick={() => navigate("/student/signup")}
                className="text-xs md:text-sm text-white rounded-full bg-green-500 hover:bg-green-600 transition-colors px-4 py-2"
              >
                Sign Up
              </button>

              {/* Mobile Menu Button */}
              <button
                className="block md:hidden p-2 text-zinc-400 hover:text-green-400"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 z-50">
          <button
            className="text-white text-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✖ Close
          </button>
          <button
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(false);
            }}
            className="text-lg text-zinc-400 hover:text-green-400"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/about");
              setIsMobileMenuOpen(false);
            }}
            className="text-lg text-zinc-400 hover:text-green-400"
          >
            About Us
          </button>
          <button
            onClick={() => {
              navigate("/courses");
              setIsMobileMenuOpen(false);
            }}
            className="text-lg text-zinc-400 hover:text-green-400"
          >
            Courses
          </button>
          <button
            onClick={() => {
              navigate("/contact");
              setIsMobileMenuOpen(false);
            }}
            className="text-lg text-zinc-400 hover:text-green-400">
            Contact Us
          </button>
          <button
            onClick={() => {
              navigate("/student/signup");
              setIsMobileMenuOpen(false);
            }}
            className="text-lg text-green-400 hover:text-green-500"
          >
            Sign Up
          </button>
        </div>
      )}
    </>
  );
}

export default LandingNavbar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-xl z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                <span className="bg-gradient-to-b from-green-500 to-green-400 bg-clip-text text-xl sm:text-2xl font-bold tracking-tight text-transparent">
                  StuMate
                </span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/about")}
                className="text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => navigate("/courses")}
                className="text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                Courses
              </button>
              <button
                onClick={() => navigate("/team")}
                className="text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                Our Team
              </button>
              <button
                onClick={() => navigate("/placement")}
                className="text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                Placement
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="text-sm text-zinc-400 hover:text-green-400 transition-colors"
              >
                Contact Us
              </button>
            </div>

            {/* Sign In & Sign Up Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Sign In Dropdown */}
              <div className="relative">
                <button
                  className="text-xs sm:text-sm text-white rounded-full bg-green-500 hover:bg-green-600 transition-colors px-3 sm:px-4 py-1.5 sm:py-2 w-[80px] sm:w-auto"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Sign In
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-white/10 rounded-lg shadow-lg z-[60]">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500 transition-colors"
                      onClick={() => {
                        navigate("/student/login");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Student
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500 transition-colors"
                      onClick={() => {
                        navigate("/admin/login");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Admin
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500 transition-colors"
                      onClick={() => {
                        navigate("/TPO/login");
                        setIsDropdownOpen(false);
                      }}
                    >
                      TPO Admin
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500 transition-colors"
                      onClick={() => {
                        navigate("/management/login");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Management Admin
                    </button>
                  </div>
                )}
              </div>

              {/* Sign Up Button */}
              <button
                onClick={() => navigate("/student/signup")}
                className="text-xs sm:text-sm text-white rounded-full bg-green-500 hover:bg-green-600 transition-colors px-3 sm:px-4 py-1.5 sm:py-2 w-[80px] sm:w-auto"
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
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 z-[60] transition-opacity duration-300">
          <button
            className="absolute top-4 right-4 text-white text-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
              className="text-lg text-zinc-400 hover:text-green-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("/about");
                setIsMobileMenuOpen(false);
              }}
              className="text-lg text-zinc-400 hover:text-green-400 transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => {
                navigate("/courses");
                setIsMobileMenuOpen(false);
              }}
              className="text-lg text-zinc-400 hover:text-green-400 transition-colors"
            >
              Courses
            </button>
            <button
              onClick={() => {
                navigate("/team");
                setIsMobileMenuOpen(false);
              }}
              className="text-lg text-zinc-400 hover:text-green-400 transition-colors"
            >
              Our Team
            </button>
            <button
              onClick={() => {
                navigate("/placement");
                setIsMobileMenuOpen(false);
              }}
              className="text-lg text-zinc-400 hover:text-green-400 transition-colors"
            >
              Placement
            </button>
            <button
              onClick={() => {
                navigate("/contact");
                setIsMobileMenuOpen(false);
              }}
              className="text-lg text-zinc-400 hover:text-green-400 transition-colors"
            >
              Contact Us
            </button>
            {/* Mobile Sign In Dropdown */}
            <div className="relative">
              <button
                className="text-lg text-white rounded-full bg-green-500 hover:bg-green-600 transition-colors px-6 py-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Sign In
              </button>
              {isDropdownOpen && (
                <div className="mt-2 w-48 bg-black border border-white/10 rounded-lg shadow-lg">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500 transition-colors"
                    onClick={() => {
                      navigate("/student/login");
                      setIsMobileMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Student
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500 transition-colors"
                    onClick={() => {
                      navigate("/admin/login");
                      setIsMobileMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Admin
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500 transition-colors"
                    onClick={() => {
                      navigate("/TPO/login");
                      setIsMobileMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    TPO Admin
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500 transition-colors"
                    onClick={() => {
                      navigate("/management/login");
                      setIsMobileMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Management Admin
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                navigate("/student/signup");
                setIsMobileMenuOpen(false);
              }}
              className="text-lg text-white rounded-full bg-green-500 hover:bg-green-600 transition-colors px-6 py-2"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingNavbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FcMenu } from "react-icons/fc";
import { IoClose } from "react-icons/io5"; // Close icon for mobile menu

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [navOpen, setNavOpen] = useState(false); // Mobile menu state

  const links = [
    { title: "Home", link: "/" },
    { title: "Documents", link: "/documents" },
    { title: "Schemes", link: "/all-schemes" },
    { title: "Achievements", link: "/achievements" },
    { title: "Notices", link: "/notices-page" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Dashboard", link: "/profile" },
  ];

  // Remove Profile/Admin Profile based on login role
  if (!isLoggedIn) {
    links.splice(5);
  } else if (role === "user") {
    links.splice(6);
  } else if (role === "admin") {
    links.splice(5, 1);
  }

  return (
    <>
      {/* Responsive Navbar */}
      <nav className="bg-blue-50 shadow-sm border-b border-blue-100 px-4 md:px-6 py-3 flex items-center justify-between relative w-full z-30">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
            SGP
          </div>
          <div>
            <Link
              to="/"
              className="text-xl md:text-2xl font-semibold text-gray-800"
            >
              Sahyog Gram Panchayat
            </Link>
          </div>
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex gap-4 lg:gap-6 items-center">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className={`px-4 py-2 font-medium transition-all duration-300 ${
                item.title.includes("Profile") || item.title.includes("Admin")
                  ? "border-2 border-gray-500 bg-gray-100 text-gray-700 hover:bg-blue-50  hover:text-blue-700  hover:border-blue-500 active:bg-gray-300 rounded-full"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Desktop LogIn / SignUp */}
        {!isLoggedIn && (
          <div className="hidden md:flex gap-4">
            <Link
              to="/LogIn"
              className="px-6 py-2 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white active:bg-blue-600 active:text-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Login
            </Link>

            <Link
              to="/SignUp"
              className="px-6 py-2 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white active:bg-blue-600 active:text-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <IoClose /> : <FcMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
          navOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } md:hidden z-40`}
        onClick={() => setNavOpen(false)}
      >
        <div
          className={`bg-white w-4/5 max-w-sm h-full transform transition-transform duration-300 ease-in-out ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          } shadow-lg`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                SGP
              </div>
              <span className="font-medium text-gray-800">Gram Panchayat</span>
            </div>
            <button
              className="text-gray-700 hover:text-red-500 text-2xl"
              onClick={() => setNavOpen(false)}
            >
              <IoClose />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="p-4 flex flex-col space-y-3">
            {links.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className={`w-full text-center text-lg font-medium py-3 transition-all duration-300 ${
                  item.title.includes("Profile") || item.title.includes("Admin")
                    ? "border-2 border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200 hover:border-blue-500 hover:shadow-md active:bg-blue-200 active:shadow-inner rounded-full transform hover:scale-102 active:scale-98"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-lg"
                }`}
                onClick={() => setNavOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="pt-2 space-y-3">
                <Link
                  to="/LogIn"
                  className="block w-full text-center text-lg py-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white active:bg-blue-600 active:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                  onClick={() => setNavOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/SignUp"
                  className="block w-full text-center text-lg py-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white active:bg-blue-600 active:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                  onClick={() => setNavOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;

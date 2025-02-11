

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUserCircle, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [dropdownOpen, setDropdownOpen] = useState(false); // Profile dropdown toggle
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null); // Store user data
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for dropdown to detect outside click

  // Decode user data from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1]));
      setUser(userData.name); // Set user name from token
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    setUser(null); // Reset user state
    navigate("/login"); // Redirect to login page
  };

  // Close dropdown on clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <motion.nav
      className="bg-green-500 border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold italic font-serif text-black">
          Farmer's Market
        </NavLink>

        {/* Search Bar */}
        <div className="hidden lg:flex relative w-1/3">
          <input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 rounded-full border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FaSearch />
          </button>
        </div>

        {/* Links and Profile Section */}
        <div className="flex items-center space-x-4">
          {/* Navigation Links */}
          <div className="hidden lg:flex space-x-6 font-bold">
            <NavLink to="/" className="py-2 text-black-700 hover:text-white">
              Home
            </NavLink>
            <NavLink to="/about" className="py-2 text-black-700 hover:text-white">
              About
            </NavLink>
            <NavLink to="/services" className="py-2 text-black-700 hover:text-white">
              Services
            </NavLink>
            <NavLink to="/contact" className="py-2 text-black-700 hover:text-white">
              Contact
            </NavLink>
          </div>

          {/* Shopping Cart */}
          <NavLink to="/cart" className="relative text-black-600 hover:text-white">
            <FaShoppingCart className="h-6 w-6" />
          </NavLink>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              className="h-8 w-8 text-white cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg max-h-32 overflow-y-auto"
              >
                {/* Account */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/OrderedList");
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-black-600 hover:bg-gray-200"
                >
                  <FaCog className="mr-2" /> Account
                </button>

                {/* Logout */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-black-600 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-black-600 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-green-500 text-white py-4 space-y-4 font-bold">
          <NavLink to="/" className="block text-center py-2">
            Home
          </NavLink>
          <NavLink to="/about" className="block text-center py-2">
            About
          </NavLink>
          <NavLink to="/services" className="block text-center py-2">
            Services
          </NavLink>
          <NavLink to="/contact" className="block text-center py-2">
            Contact
          </NavLink>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;

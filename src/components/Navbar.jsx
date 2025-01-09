import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 md:px-8">
        {/* Top Row: Logo and Links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="https://png.pngtree.com/png-vector/20230414/ourmid/pngtree-se-logo-vector-png-image_6704562.png" // Update this path to your logo file
              alt="Suraj Electronics Logo"
              className="h-10 w-10"
            />
            <Link to="/" className="text-2xl font-bold">
              Suraj Electronics
            </Link>
          </div>

          {/* Navigation Links */}
         
        </div>

        {/* Bottom Row: Search Bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-200 text-gray-700 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

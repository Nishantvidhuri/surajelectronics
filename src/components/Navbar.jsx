import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/">Suraj Electronics</Link>
        </h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>
    </nav>
  );
};

export default Navbar;

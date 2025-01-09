import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import TVRemotes from "./pages/TVRemotes";
import { ProductProvider } from "./context/ProductContext";
import LoginPage from "./components/LoginPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <ProductProvider>
      <Router>
        <div className="dark">
          {/* Navbar */}
          <Navbar onLogout={handleLogout} />

          {/* Search Bar */}
          <div className="container mx-auto mt-6 px-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
          </div>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<TVRemotes searchQuery={searchQuery} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
};

export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import TVRemotes from "./pages/TVRemotes";
import Stand from "./pages/Stand";
import Home from "./pages/Home";
import AllData from "./pages/AllData"; // Import AllData component
import { ProductProvider } from "./context/ProductContext";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ProductProvider>
      <Router>
        <div className="dark">
          <Navbar onSearch={(query) => setSearchQuery(query.toLowerCase())} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/remotes" element={<TVRemotes searchQuery={searchQuery} />} />
            <Route path="/stands" element={<Stand />} />
            <Route path="/all-data" element={<AllData searchQuery={searchQuery} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
};

export default App;

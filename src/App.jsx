import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import TVRemotes from "./pages/TVRemotes";
import { ProductProvider } from "./context/ProductContext";

const App = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  return (
    <ProductProvider>
      <Router>
        <div className="dark">
          {/* Navbar */}
          <Navbar onSearch={(query) => setSearchQuery(query.toLowerCase())} />
          
          {/* Routes */}
          <Routes>
            <Route path="/" element={<TVRemotes searchQuery={searchQuery} />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
};

export default App;

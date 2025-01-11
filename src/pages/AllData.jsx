import React, { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";

const AllData = () => {
  const { allData, setAllData, updateProduct } = useProductContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (allData.length > 0) {
      setIsLoading(false);
      setEditedData(allData.map((item) => ({ ...item }))); // Initialize editedData properly
    }
  }, [allData]);

  const filteredData = allData.filter((item) =>
    Object.values(item || {}).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleEditClick = (index) => {
    setEditIndex(index);
    setIsModalOpen(true); // Open modal for password input
  };

  const handleSaveEdit = async () => {
    if (!editedData[editIndex]) {
      alert("Error: No data to save.");
      return;
    }

    if (!isAuthenticated) {
      alert("Authentication required to save changes.");
      return;
    }

    const updatedProduct = { ...editedData[editIndex] };

    try {
      // Call the backend to update the Excel sheet
      await updateProduct(editIndex, updatedProduct);

      // Update frontend state
      const updatedData = [...allData];
      updatedData[editIndex] = updatedProduct;
      setAllData(updatedData);
      setEditedData(updatedData);
      setIsModalOpen(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving product:", error.message);
      alert("Failed to save the product. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPasswordInput(""); // Clear password field when modal closes
    setError(null);
  };

  const handleKeypadInput = (digit) => {
    setPasswordInput((prevInput) => prevInput + digit);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === "1234") {
      setIsAuthenticated(true);
      setError(null);
      setPasswordInput(""); // Clear password field after successful submission
      setIsModalOpen(false);
    } else {
      setError("Incorrect password");
    }
  };

  const handleDeleteInput = () => {
    setPasswordInput(passwordInput.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Sticky Search Bar */}
      <div className="sticky top-0 bg-gray-800 z-50 shadow-md">
        <h1 className="text-lg font-bold py-2 text-center text-gray-100">
          Product Management
        </h1>
        <div className="px-2 pb-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-3 text-sm rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-200"
          />
        </div>
      </div>

      <div className="relative translate-y-1 min-h-screen bg-gray-900">
  {/* Loader and Table */}
  {isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      {/* Centered Loader */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin sm:w-20 sm:h-20"></div>
        <p className="text-white text-sm sm:text-lg font-semibold text-center px-4">
          Loading, please wait...
        </p>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 translate-x-0 py-4 overflow-x-auto rounded shadow bg-gray-900">
      <table className="w-full text-left bg-gray-800 rounded">
        <thead className="bg-gray-700 text-gray-100 text-xs">
          <tr>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">For Mechanic</th>
            <th className="px-4 py-2">For Customer</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-gray-700 ${
                index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
              }`}
            >
              <td className="px-4 py-2 text-sm">
                {row["product name"] || ""}
              </td>
              <td className="px-4 py-2 text-sm">
                {editIndex === index && isAuthenticated ? (
                  <input
                    type="text"
                    value={editedData[index]?.["for mechanic"] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditedData((prevData) => {
                        const updatedData = [...prevData];
                        updatedData[index]["for mechanic"] = value;
                        return updatedData;
                      });
                    }}
                    className="w-full bg-transparent focus:outline-none text-gray-200 text-sm px-1 border-b border-gray-700 focus:border-blue-500"
                  />
                ) : (
                  row["for mechanic"] || ""
                )}
              </td>
              <td className="px-4 py-2 text-sm">
                {editIndex === index && isAuthenticated ? (
                  <input
                    type="text"
                    value={editedData[index]?.["for customer"] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditedData((prevData) => {
                        const updatedData = [...prevData];
                        updatedData[index]["for customer"] = value;
                        return updatedData;
                      });
                    }}
                    className="w-full bg-transparent focus:outline-none text-gray-200 text-sm px-1 border-b border-gray-700 focus:border-blue-500"
                  />
                ) : (
                  row["for customer"] || ""
                )}
              </td>
              <td className="px-4 py-2 text-sm">
                {editIndex === index && isAuthenticated ? (
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white text-xs py-1 px-3 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(index)}
                    className="bg-blue-500 text-white text-xs py-1 px-3 rounded hover:bg-blue-600"
                  >
                    ✏️ Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow w-10/12 max-w-sm relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
              Enter Password
            </h3>
            <div className="flex justify-center mb-3">
              <div className="bg-black text-white px-3 py-1 rounded text-sm w-full text-center">
                {passwordInput || "Enter password"}
              </div>
              <button
                onClick={handleDeleteInput}
                className="bg-red-500 text-white py-1 rounded w-10 hover:bg-red-600 ml-2 text-xs"
              >
                ⌫
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleKeypadInput((i + 1).toString())}
                  className="bg-gray-300 text-gray-800 py-2 rounded text-xs hover:bg-gray-400"
                >
                  {i + 1}
                </button>
              ))}
              <button className="col-span-1" />
              <button
                onClick={() => handleKeypadInput("0")}
                className="bg-gray-300 text-gray-800 py-2 rounded text-xs hover:bg-gray-400 col-span-1"
              >
                0
              </button>
            </div>
            <button
              onClick={handlePasswordSubmit}
              className="mt-3 w-full bg-blue-500 text-white py-2 rounded text-xs hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllData;

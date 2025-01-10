import React, { useState, useEffect } from "react";
import axios from "axios";

const AllData = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editedData, setEditedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited
  const [isLoading, setIsLoading] = useState(true); // Track the loading state

  const correctPassword = "8826275828"; // The predefined password

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setData(response.data);
        setEditedData(response.data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  // Handle the password input change
  const handleKeypadInput = (input) => {
    setPasswordInput((prevInput) => prevInput + input);
  };

  // Handle delete input (backspace)
  const handleDeleteInput = () => {
    setPasswordInput((prevInput) => prevInput.slice(0, -1));
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPasswordInput(""); // Clear password input on close
    setError(""); // Clear error on close
  };

  // Handle password submission
  const handlePasswordSubmit = () => {
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true); // Password is correct
      setIsModalOpen(false); // Close modal
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  // Start editing a specific item and open the password modal
  const handleEditClick = (index) => {
    setEditIndex(index); // Set the index of the row being edited
    setIsModalOpen(true); // Show the modal to enter password
  };

  // Handle save edited data
  const handleSaveEdit = async () => {
    if (editIndex !== null && isAuthenticated) {
      try {
        const updatedData = [...editedData];
        const response = await axios.put(
          `http://localhost:5000/api/products/${editIndex}`,
          updatedData[editIndex]
        );
        console.log("Backend Response:", response.data);
        setEditIndex(null); // Reset edit mode after saving
      } catch (error) {
        console.error("Error saving data:", error.response ? error.response.data : error);
        alert("Failed to save changes.");
      }
    }
  };

  // Filter the data based on the search query
  const filteredData = editedData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-100">
        Product Management
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-5 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-200 transition duration-200"
        />
      </div>

      {/* Show Loading Indicator if Data is Still Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="text-white text-xl">Loading...</div>
        </div>
      ) : (
        // Editable Table
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-left bg-gray-800 rounded-lg">
            <thead className="bg-gray-700 text-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">Product Name</th>
                <th className="px-6 py-3 text-sm font-semibold">For Mechanic</th>
                <th className="px-6 py-3 text-sm font-semibold">For Customer</th>
                <th className="px-6 py-3 text-sm font-semibold">Actions</th>
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
                  <td className="px-6 py-4">
                    {editIndex === index && isAuthenticated ? (
                      <input
                        type="text"
                        value={row["product name"] || ""}
                        onChange={(e) =>
                          setEditedData((prevData) => {
                            const updatedData = [...prevData];
                            updatedData[index]["product name"] = e.target.value;
                            return updatedData;
                          })
                        }
                        className="w-full bg-transparent focus:outline-none text-gray-200 px-2 py-1 border-b border-gray-700 focus:border-blue-500"
                      />
                    ) : (
                      row["product name"]
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editIndex === index && isAuthenticated ? (
                      <input
                        type="text"
                        value={row["for mechanic"] || ""}
                        onChange={(e) =>
                          setEditedData((prevData) => {
                            const updatedData = [...prevData];
                            updatedData[index]["for mechanic"] = e.target.value;
                            return updatedData;
                          })
                        }
                        className="w-full bg-transparent focus:outline-none text-gray-200 px-2 py-1 border-b border-gray-700 focus:border-blue-500"
                      />
                    ) : (
                      row["for mechanic"]
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editIndex === index && isAuthenticated ? (
                      <input
                        type="text"
                        value={row["for costumer "] || ""}
                        onChange={(e) =>
                          setEditedData((prevData) => {
                            const updatedData = [...prevData];
                            updatedData[index]["for costumer "] = e.target.value;
                            return updatedData;
                          })
                        }
                        className="w-full bg-transparent focus:outline-none text-gray-200 px-2 py-1 border-b border-gray-700 focus:border-blue-500"
                      />
                    ) : (
                      row["for costumer "]
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editIndex === index && isAuthenticated ? (
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(index)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
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

      {/* Modal for Password Entry */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Enter Password
            </h3>
            <div className="flex justify-center mb-4">
              <div className="bg-black text-white px-4 py-2 rounded-md text-lg w-full text-center">
                {passwordInput || "Enter password"}
              </div>
              <button
                onClick={handleDeleteInput}
                className="bg-red-500 text-white py-3 rounded-md w-16 hover:bg-red-600 ml-2"
              >
                ⌫
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleKeypadInput((i + 1).toString())}
                  className="bg-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-400"
                >
                  {i + 1}
                </button>
              ))}
              <button className="col-span-1" />
              <button
                onClick={() => handleKeypadInput("0")}
                className="bg-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-400 col-span-1"
              >
                0
              </button>
            </div>
            <button
              onClick={handlePasswordSubmit}
              className="mt-4 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
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

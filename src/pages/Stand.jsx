import React, { useState } from "react";

const Stand = () => {
  // Data for Non-Movable Stands
  const nonMovableStands = [
    { id: 1, size: "10 inch", consumerPrice: 140, mechanicPrice: 100, costPrice: 60 },
    { id: 2, size: "12 inch", consumerPrice: 150, mechanicPrice: 120, costPrice: 80 },
    { id: 3, size: "15 inch", consumerPrice: 250, mechanicPrice: 180, costPrice: 110 },
    { id: 4, size: "21 inch", consumerPrice: 330, mechanicPrice: 250, costPrice: 170 },
  ];

  // Data for Movable Stands
  const movableStands = [
    { id: 1, model: "BM-222", size: "32 inch", consumerPrice: 500, mechanicPrice: 400, costPrice: 300 },
    { id: 2, model: "Z-3256", size: "55 inch", consumerPrice: 800, mechanicPrice: 700, costPrice: 500 },
  ];

  const [currentSection, setCurrentSection] = useState(null); // Tracks which section is displayed
  const [visibleMechanicPrice, setVisibleMechanicPrice] = useState({});
  const [visibleCostPrice, setVisibleCostPrice] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [currentPriceType, setCurrentPriceType] = useState(""); // Tracks the price type (mechanic or cost)
  const [currentStandId, setCurrentStandId] = useState(null);

  const handleShowModal = (id, type) => {
    setCurrentStandId(id); // Store the ID of the stand
    setCurrentPriceType(type); // Store the type of price to reveal
    setPasswordInput("");
    setError("");
    setShowModal(true);
  };

  const handlePasswordSubmit = () => {
    if (
      (currentPriceType === "mechanic" && passwordInput === "88262728") ||
      (currentPriceType === "cost" && passwordInput === "3695")
    ) {
      if (currentPriceType === "mechanic") {
        setVisibleMechanicPrice((prev) => ({ ...prev, [currentStandId]: true }));
      } else if (currentPriceType === "cost") {
        setVisibleCostPrice((prev) => ({ ...prev, [currentStandId]: true }));
      }
      setShowModal(false); // Hide the modal
    } else {
      setError("Invalid password"); // Show error message for incorrect password
    }
  };

  // Select the current data based on the selected section
  const currentStands =
    currentSection === "nonMovable" ? nonMovableStands : movableStands;

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6">Stands</h2>

      {/* Boxes for Non-Movable and Movable Sections */}
      {!currentSection && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => setCurrentSection("nonMovable")}
            className="bg-blue-500 text-white text-center py-8 rounded-lg shadow-lg cursor-pointer hover:bg-blue-600 transition duration-200"
          >
            <h3 className="text-xl font-bold">Non-Movable Stands</h3>
          </div>
          <div
            onClick={() => setCurrentSection("movable")}
            className="bg-green-500 text-white text-center py-8 rounded-lg shadow-lg cursor-pointer hover:bg-green-600 transition duration-200"
          >
            <h3 className="text-xl font-bold">Movable Stands</h3>
          </div>
        </div>
      )}

      {/* Table for Current Section */}
      {currentSection && (
        <div>
          <button
            onClick={() => setCurrentSection(null)}
            className="mb-6 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Back to Categories
          </button>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-700 text-left">Size</th>
                  {currentSection === "movable" && (
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Model</th>
                  )}
                  <th className="px-4 py-2 border-b border-gray-700 text-left">Consumer Price</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-left">Mechanic Price</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-left">Cost Price</th>
                </tr>
              </thead>
              <tbody>
                {currentStands.map((stand) => (
                  <tr key={stand.id}>
                    <td className="px-4 py-2 border-b border-gray-700">{stand.size}</td>
                    {currentSection === "movable" && (
                      <td className="px-4 py-2 border-b border-gray-700">{stand.model}</td>
                    )}
                    <td className="px-4 py-2 border-b border-gray-700">₹{stand.consumerPrice}</td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {visibleMechanicPrice[stand.id] ? (
                        `₹${stand.mechanicPrice}`
                      ) : (
                        <button
                          onClick={() => handleShowModal(stand.id, "mechanic")}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Reveal
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {visibleCostPrice[stand.id] ? (
                        `₹${stand.costPrice}`
                      ) : (
                        <button
                          onClick={() => handleShowModal(stand.id, "cost")}
                          className="text-gray-500 hover:text-gray-700 text-sm"
                        >
                          Show
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Enter Password</h3>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-200 text-gray-700 focus:outline-none"
              placeholder="Enter password"
            />
            <button
              onClick={handlePasswordSubmit}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stand;

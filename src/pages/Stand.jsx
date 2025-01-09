import React, { useState } from "react";

const Stand = () => {
  // Data for Non-Movable Stands
  const nonMovableStands = [
    { id: 1, size: "10 inch", consumerPrice: 140, mechanicPrice: 100, costPrice: 60 },
    { id: 2, size: "12 inch", consumerPrice: 150, mechanicPrice: 120, costPrice: 80 },
    { id: 3, size: "15 inch", consumerPrice: 250, mechanicPrice: 180, costPrice: 110 },
    { id: 4, size: "21 inch", consumerPrice: 330, mechanicPrice: 250, costPrice: 170 },
  ];

  const movableStands = [
    { id: 1, model: "BM-222", size: "32 inch", consumerPrice: 500, mechanicPrice: 400, costPrice: 300 },
    { id: 2, model: "Z-3256", size: "55 inch", consumerPrice: 800, mechanicPrice: 700, costPrice: 500 },
  ];

  const [currentSection, setCurrentSection] = useState(null);
  const [visibleMechanicPrice, setVisibleMechanicPrice] = useState({});
  const [visibleCostPrice, setVisibleCostPrice] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [currentPriceType, setCurrentPriceType] = useState("");
  const [currentStandId, setCurrentStandId] = useState(null);

  const handleShowModal = (id, type) => {
    setCurrentStandId(id);
    setCurrentPriceType(type);
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
      setShowModal(false);
    } else {
      setError("Invalid password");
    }
  };

  const handleKeypadInput = (value) => {
    setPasswordInput((prev) => prev + value);
  };

  const handleDeleteInput = () => {
    setPasswordInput((prev) => prev.slice(0, -1));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPasswordInput("");
    setError("");
  };

  const currentStands =
    currentSection === "nonMovable" ? nonMovableStands : movableStands;

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6">Stands</h2>

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

      {currentSection && (
        <div>
          <button
            onClick={() => setCurrentSection(null)}
            className="mb-6 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Back to Categories
          </button>

          <div className="-translate-x-2 ">
            <table className="w-full bg-gray-800 text-white rounded-lg">
              <thead>
                <tr>
                  <th className="px-2 py-2 border-b border-gray-700 text-left">Size</th>
                  {currentSection === "movable" && (
                    <th className="px-2 py-2 border-b border-gray-700 text-left">Model</th>
                  )}
                  <th className="px-2 py-2 border-b border-gray-700 text-left">Consumer Price</th>
                  <th className="px-2 py-2 border-b border-gray-700 text-left">Mechanic Price</th>
                  <th className="px-2 py-2 border-b border-gray-700 text-left">Cost Price</th>
                </tr>
              </thead>
              <tbody>
                {currentStands.map((stand) => (
                  <tr key={stand.id}>
                    <td className="px-2 py-2 border-b border-gray-700">{stand.size}</td>
                    {currentSection === "movable" && (
                      <td className="px-2 py-2 border-b border-gray-700">{stand.model}</td>
                    )}
                    <td className="px-2 py-2 border-b border-gray-700">₹{stand.consumerPrice}</td>
                    <td className="px-2 py-2 border-b border-gray-700">
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
                    <td className="px-2 py-2 border-b border-gray-700">
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md relative">
            {/* Close Button */}
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
              {/* Keypad Layout */}
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

export default Stand;

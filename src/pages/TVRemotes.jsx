import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const TVRemotes = ({ searchQuery }) => {
  const [remoteData, setRemoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRemote, setNewRemote] = useState({
    photo: null,
    name: "",
    shelfNumber: "",
  });

  useEffect(() => {
    const fetchRemoteData = async () => {
      try {
        const response = await fetch(
          "https://suraj-electronics.onrender.com/api/remote-data"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch remote data");
        }
        const data = await response.json();
        setRemoteData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRemoteData();
  }, []);

  const handleAddRemote = async () => {
    if (!newRemote.photo || !newRemote.name || !newRemote.shelfNumber) {
      alert("All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("photo", newRemote.photo);
      formData.append("name", newRemote.name);
      formData.append("shelfNumber", newRemote.shelfNumber);

      const response = await fetch(
        "https://suraj-electronics.onrender.com/api/add-remote",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add new remote");
      }

      const updatedData = await response.json();
      setRemoteData(updatedData);
      setIsModalOpen(false);
      setNewRemote({ photo: null, name: "", shelfNumber: "" });
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const filteredRemotes = remoteData.filter((remote) =>
    remote.name.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  const sortedRemotes = filteredRemotes.sort((a, b) => {
    const shelfA = parseInt(a.shelfNumber.replace(/\D/g, "")) || 0;
    const shelfB = parseInt(b.shelfNumber.replace(/\D/g, "")) || 0;
    return shelfA - shelfB;
  });

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-4">TV Remotes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedRemotes.length === 0 ? (
          <p>No TV remotes found matching your search.</p>
        ) : (
          sortedRemotes.map((remote, index) => (
            <Card key={index} {...remote} />
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-yellow-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-yellow-600 focus:outline-none"
      >
        +
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-md w-11/12 max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-200">
              Add New Remote
            </h3>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewRemote({ ...newRemote, photo: e.target.files[0] })
                }
                className="w-full border border-gray-600 bg-gray-700 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Name:</label>
              <input
                type="text"
                value={newRemote.name}
                onChange={(e) =>
                  setNewRemote({ ...newRemote, name: e.target.value })
                }
                className="w-full border border-gray-600 bg-gray-700 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Shelf Number:</label>
              <input
                type="text"
                value={newRemote.shelfNumber}
                onChange={(e) =>
                  setNewRemote({ ...newRemote, shelfNumber: e.target.value })
                }
                className="w-full border border-gray-600 bg-gray-700 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-gray-200 px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRemote}
                className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TVRemotes;

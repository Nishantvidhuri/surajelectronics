import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const TVRemotes = ({ searchQuery }) => {
  const [remoteData, setRemoteData] = useState([]); // State to store remote data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch remote data from the backend API
    const fetchRemoteData = async () => {
      try {
        const response = await fetch("https://surajelectronics.onrender.com/api/remote-data");
        if (!response.ok) {
          throw new Error("Failed to fetch remote data");
        }
        const data = await response.json();
        setRemoteData(data); // Set the remote data
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchRemoteData();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Filter based on search query (if provided)
  const filteredRemotes = remoteData.filter((remote) =>
    remote.name.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  // Sort filtered remotes by shelf number
  const sortedRemotes = filteredRemotes.sort((a, b) => {
    const shelfA = parseInt(a.shelfNumber.replace(/\D/g, "")) || 0;
    const shelfB = parseInt(b.shelfNumber.replace(/\D/g, "")) || 0;
    return shelfA - shelfB;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-4">TV Remotes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedRemotes.length === 0 ? (
          <p>No TV remotes found matching your search.</p>
        ) : (
          sortedRemotes.map((remote, index) => (
            <Card key={index} {...remote} /> // Spread the remote data into the Card component
          ))
        )}
      </div>
    </div>
  );
};

export default TVRemotes;

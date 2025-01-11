import React from "react";
import { useProductContext } from "../context/ProductContext";
import Card from "../components/Card";

const TVRemotes = ({ searchQuery }) => {
  const { remoteData } = useProductContext();  // Access remote data from context

  console.log(remoteData);  // You can remove this in production

  // Add a check to make sure remoteData is defined
  if (!remoteData) {
    return <p>Loading products...</p>;
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
            <Card key={index} {...remote} />  // Spread the remote data into the Card component
          ))
        )}
      </div>
    </div>
  );
};

export default TVRemotes;

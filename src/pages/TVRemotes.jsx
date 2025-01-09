import React from "react";
import { useProductContext } from "../context/ProductContext";
import Card from "../components/Card";

const TVRemotes = ({ searchQuery }) => {
  const { products } = useProductContext();

  // Filter based on search query (if provided)
  const filteredRemotes = products.filter((remote) =>
    remote.name.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  // Sort filtered remotes by shelf number
  const sortedRemotes = filteredRemotes.sort((a, b) => {
    // Extract numeric parts of the shelf number for sorting
    const shelfA = parseInt(a.shelfNumber.replace(/\D/g, "")) || 0; // Extract numeric part or default to 0
    const shelfB = parseInt(b.shelfNumber.replace(/\D/g, "")) || 0;
    return shelfA - shelfB; // Sort in ascending order of shelf number
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-4">TV Remotes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedRemotes.map((remote, index) => (
          <Card key={index} {...remote} />
        ))}
      </div>
    </div>
  );
};

export default TVRemotes;

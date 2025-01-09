import React from "react";
import { useProductContext } from "../context/ProductContext";
import Card from "../components/Card";

const ACRemotes = ({ searchQuery }) => {
  const { acRemotes } = useProductContext();

  const filteredRemotes = acRemotes.filter((remote) =>
    remote.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-4">AC Remotes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRemotes.map((remote) => (
          <Card key={remote.name} {...remote} />
        ))}
      </div>
    </div>
  );
};

export default ACRemotes;

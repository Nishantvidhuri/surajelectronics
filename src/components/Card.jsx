import React from "react";

const Card = ({ name, shelfNumber, image }) => {
  return (
    <div className="bg-gray-800 text-gray-100 shadow-lg rounded-lg overflow-hidden border border-gray-700">
      {/* Image Section */}
      <div className="w-full flex items-center justify-center bg-gray-900">
        <img
          className="w-full h-auto object-cover" // Ensure full width and adapt height
          src={image}
          alt={name}
        />
      </div>
      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm font-bold text-yellow-400">Shelf: {shelfNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

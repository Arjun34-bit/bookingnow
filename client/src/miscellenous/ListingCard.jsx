import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <img
        className="w-full h-48 object-cover"
        src={listing.images}
        alt={listing.name}
      />

      {/* Content Section */}
      <div className="p-4">
        {/* Name & Type */}
        <h2 className="text-2xl font-semibold text-gray-800">{listing.name}</h2>
        <p className="text-gray-600 text-sm">
          {listing.type === "hotel" ? "🏨 Hotel" : "🍽️ Restaurant"}
        </p>

        {/* Address */}
        <p className="text-gray-500 text-sm mt-2">{listing.address}</p>

        {/* Facilities */}
        <div className="flex flex-wrap mt-2">
          {listing.facilities.map((facility, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
            >
              {facility}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-3">{listing.description}</p>

        {/* Contact & Approval Status */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">
            📞 {listing.contact}
          </span>
        </div>

        {/* Action Button */}
        <Link to={`/view/${listing?._id}`}>
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;

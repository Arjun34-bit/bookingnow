import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  console.log(listing);
  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Image Section */}
      <img
        className="w-full h-48 object-cover"
        src={listing.images}
        alt={listing.name}
      />

      {/* Content Section */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Name & Type */}
        <h2 className="text-1xl font-semibold text-gray-800">{listing.name}</h2>
        {/* Reviews and Ratings */}
        <div className="flex flex-row gap-2">
          <div className="w-6 h-4 bg-blue-700 text-[12px] text-white rounded-sm text-center">
            8.1
          </div>
          <span className="text-[12px] text-gray-600">Amazing</span>
          <span className="text-[12px] text-gray-600">149 reviews</span>
        </div>
        <p className="mt-1 text-gray-600 text-sm">
          {listing.type === "hotel" ? "🏨 Hotel" : "🍽️ Restaurant"}
        </p>

        {/* Address */}
        <p className="text-blue-700 text-sm mt-2 underline">
          {listing.address}
        </p>

        {listing.nearByes && (
          <span className="text-[10px] text-gray-600">
            {listing?.nearByes?.distance ? listing?.nearByes?.distance : 0} km
            from{" "}
            {listing?.nearByes?.distance
              ? listing?.nearByes?.landmark
              : "not mentioned"}
          </span>
        )}

        {/* Deals */}
        {listing?.offers && (
          <div className="h-5 bg-green-600 text-white p-0.5 rounded-lg text-[8px] text-center font-bold mt-1">
            {listing?.offers}
          </div>
        )}

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
        <div className="mt-auto">
          <Link to={`/view/${listing?._id}`}>
            <button className="mt-4 w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-400 hover:text-[18px] transition duration-300">
              Visit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

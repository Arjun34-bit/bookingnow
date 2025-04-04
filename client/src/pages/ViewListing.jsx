import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUnitByListing } from "../redux/unitReducer";
import { getAllListings } from "../redux/listingReducer";

const ViewListing = () => {
  const { id } = useParams();
  const listings = useSelector((state) => state?.listing?.listing);
  const listing = listings.find((item) => item._id === id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListings());
    dispatch(getUnitByListing(id));
  }, []);

  const units = useSelector((state) => state?.unit?.units);

  if (!listing) {
    return (
      <div className="text-center text-gray-500 mt-10">Listing not found.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Listing Image */}
        <img
          src={listing.images}
          alt={listing.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          {/* Listing Name & Type */}
          <h1 className="text-3xl font-bold text-gray-800">{listing.name}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {listing.type === "hotel" ? "🏨 Hotel" : "🍽️ Restaurant"}
          </p>

          {/* Address */}
          <p className="text-gray-600 mt-2">📍 {listing.address}</p>

          {/* Check-In and Check-Out Details */}
          <div className="mt-4">
            <div>
              <span>
                Check-In :<b>{listing?.timeout?.checkIn}</b>
              </span>{" "}
              <span>
                Check-Out :<b>{listing?.timeout?.checkOut}</b>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 mt-4">{listing.description}</p>
          {/* Facilities */}
          <h3 className="text-lg font-semibold mt-6">Facilities:</h3>
          <div className="flex flex-wrap mt-2">
            {listing.facilities.map((facility, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-3.5 py-1.5 rounded"
              >
                {facility}
              </span>
            ))}
          </div>

          {/* Contact & Approval */}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-700 font-semibold">
              📞 {listing.contact}
            </span>
          </div>

          {/* Available Units (Rooms or Tables) */}
          <h3 className="text-lg font-semibold mt-6">
            {listing.type === "hotel" ? "Available Rooms" : "Available Tables"}:
          </h3>
          {units.length > 0 ? (
            <div className="mt-4 space-y-4">
              {units.map((unit) => (
                <div
                  key={unit._id}
                  className="p-4 border rounded-md shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-md font-semibold">{unit.name}</h4>
                    <p className="text-gray-500">
                      Capacity: {unit.capacity} people
                    </p>
                    <p className="text-gray-500">Availablity: {unit?.count}</p>
                    <p className="text-gray-600 font-bold">
                      💰 Price: ₹{unit.price}
                    </p>
                  </div>
                  <Link to={`/room/${unit._id}`}>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                      {unit.type === "room" ? "View Room" : "View Table"}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">
              No {listing.type === "hotel" ? "rooms" : "tables"} available.
            </p>
          )}

          {/* Book Now Button */}
          <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewListing;

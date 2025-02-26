import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUnitById, getUnitByListing } from "../redux/unitReducer";

const ViewRoom = () => {
  const { id } = useParams();
  const room = useSelector((state) => state?.unit?.unit);
  // const listings = useSelector((state) => state?.listing?.listing);

  const dispatch = useDispatch();

  console.log(room);

  useEffect(() => {
    dispatch(getUnitById(id));
  }, []);

  if (!room) {
    return (
      <div className="text-center text-gray-500 mt-10">Room not found.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Room Image */}
        <img
          src={room?.images}
          alt={room.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          {/* Room Name */}
          <h1 className="text-3xl font-bold text-gray-800">{room.name}</h1>
          <p className="text-gray-600 mt-2">🏨 Room Type: {room.type}</p>

          {/* Capacity & Price */}
          <p className="text-gray-700 mt-4">
            👥 Capacity: {room.capacity} people
          </p>
          <p className="text-gray-800 font-bold mt-2">
            💰 Price: ₹{room.price} per night
          </p>

          {/* Availability */}
          <p
            className={`mt-4 font-semibold ${
              room.available ? "text-green-600" : "text-red-500"
            }`}
          >
            {room.available ? "✅ Available for Booking" : "⏳ Not Available"}
          </p>

          {/* Book Room Button */}
          {room.available ? (
            <Link to={`/book/${room._id}`}>
              <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
                Book Room
              </button>
            </Link>
          ) : (
            <button
              className="mt-6 w-full bg-gray-400 text-white py-3 rounded-md cursor-not-allowed"
              disabled
            >
              Room Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRoom;

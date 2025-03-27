import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUnitById } from "../redux/unitReducer";

const ViewRoom = () => {
  const { id } = useParams();
  const [counts, setCounts] = useState(0);
  const [cartInc, setCartInc] = useState(false);

  const room = useSelector((state) => state?.unit?.unit);

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

  const addToCart = () => {
    setCartInc(true);
    handleAddCartCount("add");
  };

  const handleAddCartCount = (op) => {
    if (op === "add") {
      if (counts < room?.count) {
        setCounts((prev) => prev + 1);
      }
    } else {
      if (counts === 0) {
        setCartInc(false);
        return;
      }
      if (counts > 0) {
        setCounts((prev) => prev - 1);
      }
    }
  };

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
          <p className="text-gray-700 mt-4">1️⃣ Availability: {room?.count}</p>
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
            // <Link to={`/book/${room._id}`}>
            <Link>
              {cartInc ? (
                <div className="h-12 mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 flex justify-between items-center">
                  <button
                    className="px-8 h-12 w-24 bg-indigo-500 font-bold text-xl hover:bg-indigo-700"
                    onClick={() => handleAddCartCount("sub")}
                  >
                    {"-"}
                  </button>
                  <span>{counts}</span>
                  <button
                    className="px-8 h-12 w-24 bg-indigo-500 font-bold text-xl hover:bg-indigo-700"
                    onClick={() => handleAddCartCount("add")}
                  >
                    {"+"}
                  </button>
                </div>
              ) : (
                <button
                  className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
                  onClick={addToCart}
                >
                  🛒 Add to Cart
                </button>
              )}
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

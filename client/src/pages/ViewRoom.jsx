import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUnitById } from "../redux/unitReducer";
import { setBookingDates, setCount } from "../redux/variableReducer";

const ViewRoom = () => {
  const { id } = useParams();
  const [counts, setCounts] = useState(0);
  const [cartInc, setCartInc] = useState(false);

  const room = useSelector((state) => state?.unit?.unit);

  const [bookingDate, setBookingDate] = useState({ checkIn: "", checkOut: "" });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnitById(id));
  }, []);

  useEffect(() => {
    dispatch(setBookingDates(bookingDate));
  }, [bookingDate]);

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
        dispatch(setCount("add"));
      }
    } else {
      if (counts <= 1) {
        setCounts(0);
        dispatch(setCount("sub"));
        setCartInc(false);
        return;
      }
      if (counts > 0) {
        setCounts((prev) => prev - 1);
        dispatch(setCount("sub"));
      }
    }
  };

  const handlePrice = (price) => {
    if (counts > 0) {
      return price * counts;
    } else {
      return price;
    }
  };

  const today = new Date().toISOString().split("T")[0];

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
          <p className="text-gray-600 mt-2">🏨Type: {room.type}</p>

          {/* Capacity & Price */}
          <p className="text-gray-700 mt-4">
            👥 Capacity: {room.capacity} Adult 0 Child
          </p>
          <p className="text-gray-700 mt-4">1️⃣ Availability: {room?.count}</p>
          <p className="text-gray-800 font-bold mt-2">
            💰 Price: ₹ {handlePrice(room?.price)} / night
          </p>

          {/* Availability */}
          {/* <p
            className={`mt-4 font-semibold ${
              room.available ? "text-green-600" : "text-red-500"
            }`}
          >
            {room.available ? "✅ Available for Booking" : "⏳ Not Available"}
          </p> */}

          {/* Booking Date Selection */}
          <div className="flex mt-4 gap-1">
            <label className="text-gray-600 text-[10px] font-semibold">
              CheckIn
            </label>
            <input
              type="date"
              className="mt-2 border border-gray-300 px-3 py-2 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={bookingDate.checkIn}
              onChange={(e) =>
                setBookingDate((prev) => ({ ...prev, checkIn: e.target.value }))
              }
              min={today}
            />
            <label className="text-gray-600 text-[10px] font-semibold">
              CheckOut
            </label>
            <input
              type="date"
              className="mt-2 border border-gray-300 px-3 py-2 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={bookingDate.checkOut}
              onChange={(e) =>
                setBookingDate((prev) => ({
                  ...prev,
                  checkOut: e.target.value,
                }))
              }
              min={bookingDate?.checkIn ? bookingDate?.checkIn : today}
            />
          </div>

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
                  {room.type === "table" ? "Reserve" : "Book"}
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

          {counts > 0 ? (
            <Link to={`/book/${room._id}`}>
              <button className="mt-6 w-full bg-gray-300 text-black py-3 rounded-md cursor">
                {"Next"}
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRoom;

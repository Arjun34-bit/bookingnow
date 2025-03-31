import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUnitById } from "../redux/unitReducer";
import { createBooking } from "../redux/bookingReducer";
import { openModal } from "../redux/authReducer";

const BookingPage = () => {
  const { id } = useParams();
  const room = useSelector((state) => state?.unit?.unit);
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();

  const [bookingDate, setBookingDate] = useState({ checkIn: "", checkOut: "" });
  const [showDialog, setShowDialog] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    dispatch(getUnitById(id));
  }, []);

  if (!room) {
    return (
      <div className="text-center text-gray-500 mt-10">Room not found.</div>
    );
  }

  const handleBooking = () => {
    if (!bookingDate) {
      alert("Please select a booking date.");
      return;
    }

    const bookingDetails = {
      token: user?.token,
      listingId: room.listingId,
      unitId: room._id,
      bookingDate,
    };

    dispatch(createBooking(bookingDetails));

    setStatus("success");
    setShowDialog(true);
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
          <h1 className="text-3xl font-bold text-gray-800">{room.name}</h1>
          <p className="text-gray-700 mt-2">
            👥 Capacity: {room.capacity} people
          </p>
          <p className="text-gray-800 font-bold mt-2">
            💰 Price: ₹{room.price} per night
          </p>

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
            />
            <label className="text-gray-600 text-[10px] font-semibold">
              CheckOut
            </label>
            <input
              type="date"
              className="mt-2 border border-gray-300 px-3 py-2 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={bookingDate.checkOut}
              onChange={(e) =>
                setBookingDate((prev) => ({ ...prev, chekOut: e.target.value }))
              }
            />
          </div>

          {/* Booking Button */}
          {user ? (
            <button
              onClick={handleBooking}
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Confirm Booking
            </button>
          ) : (
            <Link
              to="/"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              onClick={() => dispatch(openModal())}
            >
              <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
                Confirm Booking
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Dialog Box for Successful Booking */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Booking Confirmed! ✅
            </h2>
            <p className="text-gray-600 mt-2">
              Your room has been successfully booked for {bookingDate}.
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setShowDialog(false);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;

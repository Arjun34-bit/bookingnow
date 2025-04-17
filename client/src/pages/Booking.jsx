import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getUnitById } from "../redux/unitReducer";
import { createBooking } from "../redux/bookingReducer";
import { openModal } from "../redux/authReducer";
import { getAllListings } from "../redux/listingReducer";
import { TicketIcon } from "@heroicons/react/20/solid";
import { setCount } from "../redux/variableReducer";

const BookingPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const room = useSelector((state) => state?.unit?.unit);
  const user = useSelector((state) => state?.user?.user);

  const listings = useSelector((state) => state?.listing?.listing);
  const listing = listings.find((item) => item._id === room?.listingId);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListings());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setCount("null"));
    };
  }, [location.pathname]);

  const d = new Date();
  const currDate = d.toISOString().split("T")[0];

  const count = useSelector((state) => state?.variable?.count);
  const date = useSelector((state) => state?.variable?.bookingDates);

  const checkInDate = new Date(date?.checkIn);
  const checkOutDate = new Date(date?.checkOut);

  const timeDifference = checkOutDate - checkInDate;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  const [showDialog, setShowDialog] = useState(false);
  const [status, setStatus] = useState(null);

  const [finalPrice, setFinalPrice] = useState(0);
  const [tax, setTax] = useState(0);

  const handlePrice = (price) => {
    const finalPrices = price * daysDifference;
    const taxPrice = finalPrices * 0.18;
    setTax(taxPrice);
    setFinalPrice(finalPrices);
    return;
  };

  useEffect(() => {
    dispatch(getUnitById(id));
    handlePrice(room?.price);
  }, []);

  if (!room) {
    return (
      <div className="text-center text-gray-500 mt-10">Room not found.</div>
    );
  }

  const handleBooking = () => {
    const bookingDetails = {
      token: user?.token,
      listingId: room.listingId,
      unitId: room._id,
      bookingDetails: {
        date: {
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        },
        timeout: {
          checkIn: "10:00AM",
          checkOut: "11:00AM",
        },
        lengthOfStay: daysDifference,
        roomDetails: {
          name: room?.name,
          capacity: room?.capacity,
          noOfRoom: count,
          basePrice: room?.price,
          finalPrice: finalPrice,
          tax: tax,
          cancellationDetails: {
            time: "12:00AM",
            date: currDate,
          },
        },
      },
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

        <div className="p-4 border-[1px] border-black mt-2 rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800">{listing?.name}</h1>
          <p className="text-gray-700 mt-2">{listing?.address}</p>

          {/* Reviews and Ratings */}
          <div className="flex flex-row gap-2">
            <div className="w-6 h-4 bg-blue-700 text-[12px] text-white rounded-sm text-center">
              8.1
            </div>
            <span className="text-[12px] text-gray-600">Amazing</span>
            <span className="text-[12px] text-gray-600">149 reviews</span>
          </div>

          {/* Facilities */}
          <div className="flex flex-wrap mt-2">
            {listing?.facilities?.map((facility, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>

        {/* Two Box  */}
        <div className="flex justify-between items-center gap-1 h-72">
          <div className="p-6 border-[0.5px] border-gray-400 mt-2 rounded-lg w-1/2 h-full">
            <h5 className="font-semibold text-gray-800">Booking Details</h5>
            {/* Date and Time  */}
            <div className="flex justify-between items-center w-full mt-1 gap-1">
              {/* checkIn */}
              <div className="block">
                <span>check-In</span>
                <p className="text-1xl font-bold">{date?.checkIn}</p>
                <span className="text-sm">
                  From{" "}
                  {listing?.timeout?.checkIn
                    ? listing?.timeout?.checkIn
                    : "10:00AM"}
                </span>
              </div>

              {/* checkOut */}
              <div className="block">
                <span>check-Out</span>
                <p className="text-1xl font-bold">{date?.checkOut}</p>
                <p className="text-sm">
                  Until{" "}
                  {listing?.timeout?.checkOut
                    ? listing?.timeout?.checkOut
                    : "11:00AM"}
                </p>
              </div>
            </div>

            <div className="mt-1 inline">
              <span className="font-semibold">Length of Stay : </span>
              <span>{daysDifference} nights</span>
            </div>
            <p className="text-gray-700 mt-2 font-semibold">
              Selected Room : {room?.name}
            </p>
            <p className="text-gray-700 mt-2">
              👥 Capacity: {room.capacity} people
            </p>
            <p className="text-gray-800 font-bold mt-2">
              💰 Price: ₹{room.price} X {daysDifference}
            </p>
            <p className="text-gray-800 font-bold mt-2">
              💰 No of Room: ₹{count} X {room?.price} per night
            </p>
          </div>

          <div className="py-3 border-[0.5px] border-gray-400 mt-2 rounded-lg w-1/2 h-full">
            <h4 className="font-semibold text-1xl p-2">Your Price Summary :</h4>
            <div className="p-2 bg-blue-100 h-12 w-full flex justify-between items-center">
              <span className="text-2xl font-bold">Price :</span>
              <span className="text-2xl font-bold">₹{finalPrice}</span>
            </div>

            <div className="p-2">
              <h5 className="text-1xl font-semibold">Bill Information :</h5>
              <div className="flex justify-between items-center gap-2">
                <TicketIcon className="w-5 h-5" />
                <div
                  className="block
                 text-sm"
                >
                  <span>Excludes ₹ {tax} in taxes and fees</span>
                  <p>18 % Goods & services tax</p>
                </div>
                <p className="text-[12px] text-grey-300 mt-5">₹{tax}</p>
              </div>
            </div>

            <div className="p-2 w-full mt-2">
              <h5 className="font-semibold text-[16px]">
                Cancellation Charge ?
              </h5>
              <span className="text-green-400 text-sm">
                Free cancellation before May 30
              </span>
              <div className="flex justify-between items-center gap-1 mt-2">
                <p className="text-[12px]">After 12:00 AM on May 30</p>
                <p className="text-[12px]">₹ 1150</p>
              </div>
            </div>
          </div>
        </div>

        <div>
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
              Booking Success for {daysDifference}{" "}
              {daysDifference > 1 ? " nights" : " night"}.
            </p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => {
                  setShowDialog(false);
                  navigate("/booking-history");
                }}
                className="bg-white text-black px-4 py-2 rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDialog(false);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;

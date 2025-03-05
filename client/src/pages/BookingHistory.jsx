import React, { useEffect, useState } from "react";
import {
  cancelBooking,
  changeBookingStatus,
  getAllBookingVendor,
  getBookingByUser,
} from "../redux/bookingReducer";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "../miscellenous/Loading";

const BookingHistory = ({ role }) => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state?.booking?.bookings);

  const loading = useSelector((state) => state?.booking?.loading);

  const cancelBookings = (bookingId) => {
    dispatch(cancelBooking({ bookingId: bookingId, token: user?.token }));
  };

  const handleApprove = (bookingId) => {
    dispatch(
      changeBookingStatus({
        bookingId: bookingId,
        token: user?.token,
        status: "confirmed",
      })
    );
  };

  // useEffect(() => {
  //   if (role !== "vendor") {
  //     console.log(user);
  //     dispatch(getBookingByUser({ token: user?.token }));
  //   } else {
  //     dispatch(getAllBookingVendor({ token: user?.token }));
  //   }
  // }, [cancelBooking]);

  useEffect(() => {
    if (role === "vendor") {
      console.log(user);
      console.log("Fetching vendor bookings...");
      dispatch(getAllBookingVendor({ token: user.token }));
    } else {
      console.log("Fetching user bookings...");
      dispatch(getBookingByUser({ token: user.token }));
    }
  }, [role, user?.token, dispatch]);

  return (
    <>
      {loading ? <LoadingBar /> : ""}
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-6">Booking History</h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto max-h-full">
            <table className="max-h-[300px] overflow-y-auto border border-gray-300 rounded-lg">
              <thead className="bg-indigo-600  text-white sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-left">Hotel/Restaurant</th>
                  <th className="py-3 px-4 text-left">Room/Table</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Booking Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Payment</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-t hover:bg-gray-100 transition font-semibold"
                  >
                    <td className="py-3 px-4">{booking?.listingId?.name}</td>
                    <td className="py-3 px-4">{booking?.unitId?.name}</td>
                    <td className="py-3 px-4">₹{booking?.unitId?.price}</td>
                    <td className="py-3 px-4">
                      {new Date(booking?.bookingDate).toLocaleDateString()}
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        booking.status === "confirmed"
                          ? "text-green-600"
                          : booking.status === "canceled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </td>
                    <td className="py-3 px-4">{booking?.paymentDetails}</td>
                    <td className="py-3 px-4 text-center ">
                      {booking.status !== "canceled" ? (
                        <>
                          <button
                            onClick={() => cancelBookings(booking?._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition w-48 h-8"
                          >
                            Cancel Booking
                          </button>
                          {role === "vendor" ? (
                            <button
                              onClick={() => handleApprove(booking?._id)}
                              disabled={
                                booking?.status === "confirmed" ? true : false
                              }
                              className={
                                booking?.status === "confirmed"
                                  ? "mt-1 bg-green-200 text-black px-1 py-1 rounded-md  transition w-48 h-8"
                                  : "mt-1 bg-green-500 text-white px-1 py-1 rounded-md hover:bg-green-300 transition w-48 h-8"
                              }
                            >
                              {booking?.status === "confirmed"
                                ? "Approved"
                                : "Approve Booking"}
                            </button>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400">
                          {" "}
                          {booking?.status === "confirmed"
                            ? "Confirmed"
                            : "Canceled"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingHistory;

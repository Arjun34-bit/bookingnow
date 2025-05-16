const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Unit = require("../models/Unit");

const cancelBooking = async (bookingId, userId) => {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  try {
    const booking = await Booking.findById({
      _id: bookingId,
      userId,
    });

    if (!booking) throw new Error("Booking not found or unauthorized");

    const updatedCount = booking.bookingDetails.roomDetails.noOfRoom;

    console.log(updatedCount);

    const unit = await Unit.updateOne(
      { listingId: booking.listingId },
      {
        $set: { available: true },
        $inc: { count: updatedCount },
      }
    );

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "canceled" },
      { new: true }
    );

    // await session.commitTransaction();
    // session.endSession();

    return updatedBooking;
  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    throw error;
  }
};

module.exports = { cancelBooking };

const { kafkaProducer } = require("../kafka-service/producer");
const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const Unit = require("../models/Unit");
const User = require("../models/Users");
const Vendor = require("../models/Vendor");

//User
const createBooking = async (req, res) => {
  try {
    const userRole = await User.findById(req.user.userId);

    if (userRole.role === "vendor") {
      return res
        .status(401)
        .json({ message: "Access Denied, This account has not access" });
    }

    const { listingId, unitId, bookingDetails } = req.body;
    const roomCount = bookingDetails?.roomDetails?.noOfRoom;

    // Atomically check availability and decrement count
    const unit = await Unit.findOneAndUpdate(
      {
        _id: unitId,
        listingId: listingId,
        available: true,
        count: { $gte: roomCount }, // Make sure enough rooms are available
      },
      {
        $inc: { count: -roomCount }, // Atomically decrement count
      },
      { new: true }
    );

    if (!unit) {
      return res
        .status(400)
        .json({ message: "Insufficient rooms or unit not available" });
    }

    const newBooking = new Booking({
      customerId: req.user.userId,
      listingId: listingId,
      unitId: unitId,
      bookingDetails: bookingDetails,
      status: "pending",
    });

    await unit.save();

    await newBooking.save();

    if (process.env.DEPLOYMENT === "PROD") {
      // await kafkaProducer("unit-maintain", JSON.stringify(newBooking));
      await kafkaProducer(
        "email-service",
        JSON.stringify({
          bookingData: newBooking,
          name: userRole?.name,
          email: userRole?.email,
        })
      );
    }
    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
  }
};

//User
const getBookingsByUser = async (req, res) => {
  try {
    const userRole = await User.findById(req.user.userId);

    if (userRole.role === "vendor") {
      return res
        .status(401)
        .json({ message: "Access Denied, This account has not access" });
    }
    const bookings = await Booking.find({
      customerId: req.user.userId,
    })
      .populate("customerId", "name email")
      .populate("listingId", "name address type startingPrice")
      .populate("unitId", "name type capacity price available")
      .exec();
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

//Vendor
const getAllBookings = async (req, res) => {
  try {
    const user = await Vendor.findById(req.user.userId);

    if (user.role === "customer") {
      return res
        .status(401)
        .json({ message: "Access Denied, This account has no access" });
    }

    const listings = await Listing.find({ vendorId: req.user.userId });

    if (!listings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    const listingIds = listings.map((listing) => listing._id);

    // Fetch all bookings for the found listing IDs
    const bookings = await Booking.find({ listingId: { $in: listingIds } })
      .populate("customerId", "name email")
      .populate("listingId", "name address type startingPrice")
      .populate("unitId", "name type capacity price available")
      .exec();

    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

//Vendor and User
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const result = await cancelBookingService(bookingId, req.user.userId);

    //kafka topic for sending notification emails to users
    if (process.env.DEPLOYMENT === "PROD") {
      await kafkaProducer(
        "booking-cancelled",
        JSON.stringyfy({
          listingName: result?.bookingDetails?.roomDetails?.name,
          unitId: result?.unitId,
          availableRooms: result?.bookingDetails?.roomDetails?.noOfRoom,
        })
      );
    }

    res.status(200).json({ message: "Booking cancelled successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error cancell9ing booking", error: error.message });
  }
};

//Vendor
const changeBookingStatus = async (req, res) => {
  try {
    let userRole;
    userRole = await User.findById(req.user.userId);

    if (!userRole) {
      userRole = await Vendor.findById(req.user.userId);
    }

    if (userRole.role === "customer") {
      return res
        .status(401)
        .json({ message: "Access Denied, This account has not access" });
    }

    const { bookingId, status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: status },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Booking Status Changed", data: booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching listings", error: error.message });
  }
};

module.exports = {
  createBooking,
  getBookingsByUser,
  cancelBooking,
  changeBookingStatus,
  getAllBookings,
};

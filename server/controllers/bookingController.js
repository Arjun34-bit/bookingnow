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

    const { listingId, unitId, bookingDate } = req.body;

    // Ensure the unit exists and is available
    const unit = await Unit.findOne({
      _id: unitId,
      listingId: listingId,
      available: true,
    });
    if (!unit)
      return res
        .status(400)
        .json({ message: "Selected unit is not available" });

    const newBooking = new Booking({
      customerId: req.user.userId,
      listingId: listingId,
      unitId: unitId,
      bookingDate,
      status: "pending",
    });

    // Mark unit as unavailable
    unit.available = false;
    await unit.save();

    await newBooking.save();
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
        .json({ message: "No listings found for this user" });
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

    const booking = await Booking.findById({
      _id: bookingId,
      customer: req.user.userId,
    });

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized" });
    }

    const unit = await Unit.updateOne(
      { listingId: booking.listingId },
      { available: true }
    );

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "canceled" },
      { new: true }
    );

    res.status(200).json({ message: "Booking canceled successfully", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error canceling booking", error: error.message });
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

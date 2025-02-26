const express = require("express");
const {
  createBooking,
  getBookingsByUser,
  cancelBooking,
  changeBookingStatus,
  getAllBookings,
} = require("../controllers/bookingController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createBooking);
router.get("/user", authMiddleware, getBookingsByUser);
router.put("/cancel/:bookingId", authMiddleware, cancelBooking);
router.put("/change/", authMiddleware, changeBookingStatus);
router.post("/", authMiddleware, getAllBookings);

module.exports = router;

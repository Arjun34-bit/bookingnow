const Review = require("../models/Review");
const Booking = require("../models/Booking");

// Create a Review (Only for Completed Bookings)
const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    // Ensure the booking exists and belongs to the user
    const booking = await Booking.findOne({
      _id: bookingId,
      customer: req.user.userId,
    });
    if (!booking)
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized" });

    // Check if a review already exists for this booking
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview)
      return res
        .status(400)
        .json({ message: "Review already submitted for this booking" });

    const newReview = new Review({
      booking: bookingId,
      customer: req.user.userId,
      rating,
      comment,
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};

// Get Reviews for a Listing (Hotel/Restaurant)
const getReviewsByListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const reviews = await Review.find()
      .populate({
        path: "booking",
        populate: { path: "listing", match: { _id: listingId } },
      })
      .populate("customer", "name");

    // Filter reviews where the listing matches
    const filteredReviews = reviews.filter(
      (review) => review.booking && review.booking.listing
    );

    res.status(200).json(filteredReviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

module.exports = { createReview, getReviewsByListing };

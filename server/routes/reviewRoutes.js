const express = require("express");
const {
  createReview,
  getReviewsByListing,
} = require("../controllers/reviewController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createReview); // Customers can submit a review
router.get("/:listingId", getReviewsByListing); // Get all reviews for a specific hotel/restaurant

module.exports = router;

const express = require("express");
const {
  createListing,
  getAllListingsg,
  getAllListings,
  getListingFilter,
  getVendorListing,
} = require("../controllers/listingControllers");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, upload.single("image"), createListing);
router.get("/", getAllListings);
router.get("/search", getListingFilter);
router.post("/get", authMiddleware, getVendorListing);

module.exports = router;

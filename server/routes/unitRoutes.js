const express = require("express");
const {
  createUnit,
  getUnitsByListing,
  updateUnitAvailability,
  getUnitById,
} = require("../controllers/unitControllers");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, upload.single("image"), createUnit);
router.get("/:listingId", getUnitsByListing);
router.get("/getUnit/:id", getUnitById);
router.put("/update/:unitId", authMiddleware, updateUnitAvailability);

module.exports = router;

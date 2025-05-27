const Listing = require("../models/Listing");
const nearAssets = async (req, res) => {
  try {
    const { location } = req.body;

    let allListings;

    if (!location) {
      allListings = await Listing.find({}).limit(3);
    }
    allListings = await Listing.find({ city: location }).limit(3);
    return res.status(200).json({
      data: allListings,
      message: "Assets found for the specified location",
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { nearAssets };

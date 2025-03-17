const Listing = require("../models/Listing");
const Vendor = require("../models/Vendor");

//Vendor Access
const createListing = async (req, res) => {
  try {
    const {
      type,
      name,
      address,
      contact,
      description,
      facilities,
      startingPrice,
    } = req.body;

    const userRole = await Vendor.findById(req.user.userId);

    if (userRole.role === "customer") {
      return res
        .status(401)
        .json({ message: "Access Denied, This account has not access" });
    }

    const imageUrl = req.file
      ? req.file.path
      : "https://hotel.easemytrip.com/img/roomimage.jpg";

    const newListing = new Listing({
      vendorId: req.user.userId,
      type,
      name,
      address,
      contact,
      description,
      facilities: Array.isArray(facilities)
        ? facilities
        : facilities
        ? facilities.split(",")
        : [],
      startingPrice,
      images: imageUrl,
    });

    await newListing.save();

    res.status(201).json({ message: "Listing created", listing: newListing });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating listing", error: error.message });
  }
};

//User and Admin has free access on this controller
const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find({});

    return res
      .status(200)
      .json({ message: "All Listing Fetched", data: listings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating listing", error: error.message });
  }
};

//Filter fucntion
const getListingFilter = async (req, res) => {
  try {
    const { type, location, minPrice, maxPrice, facilities, name } = req.query;

    let filter = { approved: true };

    if (type) filter.type = type;
    if (location) filter.address = { $regex: location, $options: "i" };
    if (minPrice || maxPrice)
      filter.price = {
        ...(minPrice ? { $gte: minPrice } : {}),
        ...(maxPrice ? { $lte: maxPrice } : {}),
      };
    if (facilities) filter.facilities = { $all: facilities.split(",") };
    if (name) filter.name = { $regex: name, $options: "i" };

    const listings = await Listing.find(filter);
    res.status(200).json(listings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching listings", error: error.message });
  }
};

const getVendorListing = async (req, res) => {
  try {
    const vendorListing = await Listing.find({ vendorId: req.user.userId });
    if (!vendorListing) {
      return res.status(404).json({ message: "Lisitings not found" });
    }

    // console.log(vendorListing);

    return res.status(200).json(vendorListing);
  } catch (error) {}
};

module.exports = {
  createListing,
  getAllListings,
  getListingFilter,
  getVendorListing,
};

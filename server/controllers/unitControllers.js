const Unit = require("../models/Unit");
const Vendor = require("../models/Vendor");

//Vendor
const createUnit = async (req, res) => {
  try {
    const userRole = await Vendor.findById(req.user.userId);

    if (userRole.role === "customer") {
      return res.status(401).json({ message: "Access Denied" });
    }

    const { listingId, type, name, capacity, price, count } = req.body;

    const imageUrl = req.file
      ? req.file.path
      : "https://hotel.easemytrip.com/img/roomimage.jpg";

    const newUnit = new Unit({
      listingId,
      type,
      name,
      capacity,
      price,
      images: imageUrl,
      count,
    });

    await newUnit.save();
    res.status(201).json(newUnit);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating unit" });
  }
};

//Vendor, User and Admin has free access
const getUnitsByListing = async (req, res) => {
  try {
    const units = await Unit.find({ listingId: req.params.listingId });
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ message: "Error fetching units" });
  }
};

const getUnitById = async (req, res) => {
  try {
    const units = await Unit.findById(req.params.id);
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ message: "Error fetching units" });
  }
};

//Vendor and User(While Booking)
const updateUnitAvailability = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndUpdate(
      req.params.unitId,
      { available: req.body.available },
      { new: true }
    );
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ message: "Error updating unit availability" });
  }
};

module.exports = {
  createUnit,
  getUnitsByListing,
  updateUnitAvailability,
  getUnitById,
};

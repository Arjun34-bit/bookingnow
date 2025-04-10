const Unit = require("../models/Unit");

const updateUnitCount = async (data) => {
  try {
    const unitId = data?.unitId;
    const roomCount = data?.bookingDetails?.roomDetails?.noOfRoom;

    const unit = await Unit.findById(unitId);

    if (!unit) {
      throw new Error("Unit not found");
    }

    const updatedUnit = await Unit.findByIdAndUpdate(
      unitId,
      { count: unit.count - roomCount },
      { new: true }
    );

    console.log("Unit Count Updated");
  } catch (error) {
    console.error(error, "Error updating unit count");
  }
};

module.exports = {
  updateUnitCount,
};

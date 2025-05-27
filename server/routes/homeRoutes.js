const express = require("express");
const { nearAssets } = require("../controllers/homeControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", nearAssets);

module.exports = router;

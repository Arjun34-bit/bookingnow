const express = require("express");
const { notifyDBController } = require("../controllers/emailController");

const router = express.Router();

router.post("/notify", notifyDBController);

module.exports = router;

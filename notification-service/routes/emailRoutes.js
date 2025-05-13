const express = require("express");
const { notifyUserController } = require("../controllers/emailController");

const router = express.Router();

router.post("/notify", notifyUserController);

module.exports = router;

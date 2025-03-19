const express = require("express");
const dotenv = require("dotenv");
const color = require("color");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;

app.use("/pay-now", () => {
  console.log("Payment Done");
});

app.listen(PORT, () =>
  console.log(`Payment Service Started at Port1 ${PORT}`.yellow.bold)
);

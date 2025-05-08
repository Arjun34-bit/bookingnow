const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDBs = require("./config/dbConfig");
const { startConsumer } = require("./kafka/consumer");

const app = express();
dotenv.config();

connectDBs();

const PORT = process.env.PAYMENT_SERVICE_PORT || 5001;

startConsumer();

// Express Route - Start Consumer only when needed
app.get("/pay-now", async (req, res) => {
  console.log("Payment request received");
  await startConsumer();
  res.send("Payment Processing Started");
});

app.listen(PORT, () => console.log(`Payment Service Started at Port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");

const { startConsumer } = require("./kafka/consumer");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5002;

startConsumer();

app.listen(PORT, () => {
  console.log("Notification and Email Servie Server has Started at Port", PORT);
});

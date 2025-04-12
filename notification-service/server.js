const express = require("express");
const dotenv = require("dotenv");

const { startConsumer } = require("./kafka/consumer");
const emailRoutes = require("./routes/emailRoutes");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5002;

// startConsumer();

app.get("/", (req, res) => {
  res.send(`<html>
    <head>
      <title>Success</title>
    </head>
    <body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ fontWeight: "600" }}>API Running Successfully</div>
      </body>
  </html>`);
});

app.use("/api/", emailRoutes);

app.listen(PORT, () => {
  console.log("Notification and Email Servie Server has Started at Port", PORT);
});

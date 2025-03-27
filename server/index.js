require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const listingRoutes = require("./routes/listingRoutes");
const unitRoutes = require("./routes/unitRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// const { createTopics } = require("./kafka-service/admin");

const colors = require("colors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Creating Topics
// createTopics();

// Routes

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

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/listing", listingRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.white.bold)
);

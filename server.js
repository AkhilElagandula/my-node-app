const express = require("express");
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");
const path = require("path");
require('dotenv').config();  // Ensure this is at the very top

const app = express();

// CORS middleware
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Static file serving
app.use("/public", express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", uploadRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

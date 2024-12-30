const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/authController");

// Example routes
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);

module.exports = router; // Ensure you are exporting the router
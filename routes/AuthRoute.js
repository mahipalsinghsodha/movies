const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/AuthController");

// Register a user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

module.exports = router;

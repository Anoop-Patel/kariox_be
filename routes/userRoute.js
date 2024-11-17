const express = require("express");
const { registerUser, loginUser } = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", registerUser);

// Login an existing user
router.post("/login", loginUser);

module.exports = router;

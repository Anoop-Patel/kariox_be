const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Registration
const registerUser = async (req, res) => {
  const { name, mobile, password, address, age } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ error: "Mobile number already registered" });
    }

    // Create a new user
    const user = new User({ name, mobile, password, address, age });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Determine if the user is an admin
    const isAdmin = mobile === "7307167094" && password === "#anoop@kariox";

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, mobile: user.mobile, isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Include isAdmin in the response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

module.exports = { registerUser, loginUser };

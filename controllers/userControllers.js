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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const user = new User({
      name,
      mobile,
      password: hashedPassword,
      address,
      age,
    });
    await user.save();

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });
  } catch (error) {
    console.log(error);
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

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      token,
      user: { ...userWithoutPassword, isAdmin },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

module.exports = { registerUser, loginUser };

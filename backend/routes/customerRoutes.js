const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');

// === Customer Registration ===
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Registration request:", req.body);

  try {
    // Check if user already exists by username or email
    const existingCustomer = await Customer.findOne({ $or: [{ email }, { username }] });

    if (existingCustomer) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newCustomer = new Customer({
      username,
      email,
      password: hashedPassword,
    });

    await newCustomer.save();
    return res.status(201).json({ message: "Customer registered successfully" });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
});

// === Customer Login ===
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  try {
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      username: customer.username,
      email: customer.email,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;

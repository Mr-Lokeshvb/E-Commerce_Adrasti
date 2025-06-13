const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');

// Customer Registration Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log("From frontend:", req.body);

  try {
    const existingCustomer = await Customer.findOne({ $or: [{ email }, { username }] });

    if (existingCustomer) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      username,
      email,
      password: hashedPassword,
    });

    await newCustomer.save();
    res.status(201).json({ message: "Customer registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Customer Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt from:", email);

  try {
    const customer = await Customer.findOne({ email });

    if (!customer) {
      console.log("No account found for this email.");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      console.log("Password mismatch for email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Login successful for:", customer.username);
    return res.status(200).json({
      message: "Login successful",
      username: customer.username,
      email: customer.email,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');
const bcrypt = require('bcrypt');

// Seller Registration
router.post('/register', async (req, res) => {
  const {
    companyName,
    businessType,
    tin,
    address,
    website,
    industry,
    revenue,
    contactName,
    contactEmail,
    username,
    password
  } = req.body;

  try {
    const existingSeller = await Seller.findOne({ username });

    if (existingSeller) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      companyName,
      businessType,
      tin,
      address,
      website,
      industry,
      revenue,
      contactName,
      contactEmail,
      username,
      password: hashedPassword
    });

    await newSeller.save();
    res.status(201).json({ message: "Seller registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Seller Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ contactEmail: email });

    if (!seller) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", username: seller.username });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

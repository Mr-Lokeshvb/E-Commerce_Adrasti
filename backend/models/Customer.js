// backend/models/Customer.js

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("Customer", customerSchema);


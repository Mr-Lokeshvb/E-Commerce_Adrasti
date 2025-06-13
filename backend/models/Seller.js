const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  businessName: String,
  businessType: String,
  gstNumber: String,
  taxId: String,
  address: String,
  website: String,
  industry: String,
  revenue: String,
  contactName: String,
  jobTitle: String,
  contactEmail: String,
  contactPhone: String,
  username: String,
  password: String
});

module.exports = mongoose.model('Seller', sellerSchema);

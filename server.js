const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const customerRoutes = require('./backend/routes/customerRoutes');
const sellerRoutes = require('./backend/routes/sellerRoutes');

// Use routes
app.use('/api/customer', customerRoutes);
app.use('/api/business', sellerRoutes);

// ✅ Serve all static files from public (including cozastore + login.html)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Home page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cozastore', 'index.html'));
});

// ✅ Login page route (optional clean URL)
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

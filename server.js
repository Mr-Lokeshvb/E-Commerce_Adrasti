const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Make sure this is at the top

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Debug Mongo URI (optional, for troubleshooting)
console.log("🧪 Connecting to MongoDB using URI:", process.env.MONGO_URI);

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Import and use routes
const customerRoutes = require('./backend/routes/customerRoutes');
const sellerRoutes = require('./backend/routes/sellerRoutes');

app.use('/api/customer', customerRoutes);
app.use('/api/business', sellerRoutes);

// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'public', 'cozastore')));
app.use(express.static(path.join(__dirname, 'public'))); // for login.html, script.js, etc.

// ✅ Root route to serve CozaStore homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cozastore', 'index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

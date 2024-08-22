const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for all routes

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

  
// Routes
app.use('/api/auth', require('./routes/auth')); // For registration and login
app.use('/api/protected', require('./routes/protected')); // For protected routes
app.use('/api/cron', require('./routes/cron')); // For cron job routes

// Import and initialize cron job file
require('./cronJob'); // Ensure this is required after routes to ensure the cron job is set up correctly

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

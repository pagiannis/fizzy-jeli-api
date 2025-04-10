const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req,res) => {
    res.send('Fizzy Jeli API is running! 🎉');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
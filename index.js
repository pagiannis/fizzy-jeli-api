const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const baseRoutes = require('./routes/base');
const productRoutes = require('./routes/products');
const contactFormRoutes = require('./routes/contactForm');
const userRoutes = require('./routes/users');
const express = require('express');
const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173','http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
}));


app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/contactform', contactFormRoutes);
app.use('/api/users', userRoutes);
app.use('/', baseRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
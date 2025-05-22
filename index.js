const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const baseRoutes = require('./routes/base');
const productRoutes = require('./routes/products');
const contactFormRoutes = require('./routes/contactForm');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const verifyEmailRoutes = require('./routes/verifyEmail');
const express = require('express');
const app = express();

// Middleware
app.use(cors({
    origin: [ process.env.FRONTEND_URL, process.env.BACKEND_URL ],
    credentials: true,
    exposedHeaders: ['set-cookie', 'x-auth-token'], 
}));


app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/contactform', contactFormRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/verify-email', verifyEmailRoutes);
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
const express = require('express');
const { getAllProducts, getProductById } = require('../controllers/products');
const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Get a single product by ID
router.get('/:id', getProductById);

module.exports = router;
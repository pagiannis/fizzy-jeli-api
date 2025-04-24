const express = require('express');
const { postContactForm } = require('../controllers/contactForm');
const router = express.Router();

// Post the contact form
router.post('/', postContactForm);

module.exports = router;
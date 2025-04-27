const express = require('express');
const { postContactForm } = require('../controllers/contactForm');
const validateContactForm = require('../middleware/validateContactForm');
const router = express.Router();

// Post the contact form
router.post('/', validateContactForm, postContactForm);

module.exports = router;
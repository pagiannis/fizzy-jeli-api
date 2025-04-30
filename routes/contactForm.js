const { postContactForm } = require('../controllers/contactForm');
const validate = require('../middleware/validate');
const validateContactForm = require('../schemas/contactForm.schema');
const express = require('express');
const router = express.Router();

// Post the contact form
router.post('/', validate(validateContactForm), postContactForm);

module.exports = router;
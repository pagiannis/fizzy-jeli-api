const ContactForm = require('../models/ContactForm');

const postContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
    
        // Create and save to MongoDB
        const newContactForm = new ContactForm({ name, email, subject, message });
        await newContactForm.save();
    
        // Success response
        res.status(201).json({
          success: true,
          data: newContactForm,
          message: 'Message received!'
        });
    
    } 
    catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ 
          error: 'Server error', 
          details: error.message 
        });
    }
};
    
module.exports = { postContactForm };
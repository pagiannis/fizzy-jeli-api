const { contactFormSchema } = require('../schemas/contactForm.schema');

const validateContactForm = (req, res, next) => {
    const { error } = contactFormSchema.validate(req.body); 

    if (error) {
        return res.status(400).json({
            error: error.details[0].message 
        });
    }

    next();
};

module.exports = validateContactForm;
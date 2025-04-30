const Joi = require('joi');

function validateContactForm(form){
    const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
          'string.min': 'Name must be at least 3 characters',
          'string.empty': 'Name is required',
        }),
        subject: Joi.string().min(3).required().messages({
          'string.min': 'Subject must be at least 3 characters',
          'string.empty': 'Subject is required',
        }),
        email: Joi.string().email().required().messages({
          'string.email': 'Invalid email address',
          'string.empty': 'Email is required',
        }),
        message: Joi.string().required().messages({
          'string.empty': 'Message is required',
        }),
    });

    return schema.validate(form, { abortEarly: false });
};

module.exports = validateContactForm;
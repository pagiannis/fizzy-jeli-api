const Joi = require('joi');

// Validation schema for product creation/updates
const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    category: Joi.string().valid('jellies', 'fizzy-drink', 'limited-edition').required(),
    stock: Joi.number().integer().default(0)
});

module.exports = productSchema;
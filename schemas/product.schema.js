const Joi = require('joi');

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        image: Joi.string().required().uri(),
        secondaryImage: Joi.string().required().uri(),
        category: Joi.string().valid('jellies', 'fizzy-drink', 'limited-edition').required(),
        stock: Joi.number().integer().default(0)
    });

    return schema.validate(product);
}

module.exports = validateProduct;
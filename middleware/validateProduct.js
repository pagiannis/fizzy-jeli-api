const { productSchema } = require('../schemas/product.schema');

const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            error: error.details[0].message 
        });
    }
    next(); // Proceed if validation passes
};

module.exports = validateProduct;
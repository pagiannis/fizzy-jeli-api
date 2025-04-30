const Joi = require('joi');

function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(3).max(40).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required(),
        favourites: Joi.array().items(Joi.string()),
        bag: Joi.array().items(
            Joi.object({
                product: Joi.string().required(),
                quantity: Joi.number().integer().default(1)
            })
        )
    });

    return schema.validate(user);
}

module.exports = validateUser;
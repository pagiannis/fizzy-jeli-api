const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const complexityOptions = {
    min: 5,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4, // must meet at least 4 of the above requirements 
    messages: {
        passwordLowercase: 'Password must contain at least one lowercase letter',
        passwordUppercase: 'Password must contain at least one uppercase letter',
        passwordNumeric: 'Password must contain at least one number',
        passwordSymbol: 'Password must contain at least one special character',
        passwordMin: 'Password must be at least 5 characters long',
        passwordMax: 'Password must be at most 30 characters long'
    }
};

function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(3).max(40).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: passwordComplexity(complexityOptions).required(),
    });

    return schema.validate(user);
}

module.exports = validateUser;
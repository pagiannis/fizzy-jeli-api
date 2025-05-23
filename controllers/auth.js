const bcrypt = require('bcrypt');
const User = require('../models/User');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../services/emailService');

const postAuth = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    if (!user.isVerified){ 
        // Create a JWT with short expiry (e.g., 1h)
        const verificationToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.EMAIL_VERIFICATION_SECRET,
            { expiresIn: '1h' }
        );

        // Send verification email
        sendVerificationEmail(user.email, verificationToken)
            .catch(err => console.error('Background email error:', err));
        
        return res.status(403).send('Please verify your email address before logging in. A verification email has been sent to your email address.');
    };

    const token = user.generateAuthToken();
    res.send({
        token,
        user: {
            email: user.email,
            username: user.username,
            _id: user._id
        }
    });
};

function validate(req){
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return schema.validate(req);
}

module.exports = {
    postAuth
}
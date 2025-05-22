const bcrypt = require('bcrypt');
const crypto = require('crypto');
const _ = require('lodash');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');

const getAllUsers = async (req, res) => {
    const users = await User.find().sort({ username: 1 });
    res.send(users);
};

const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
};

const postUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        ..._.pick(req.body, ['username', 'email', 'password']),
        verificationToken: crypto.randomBytes(32).toString('hex'),
        verificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h expiry
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    await user.save();

    // Send verification email
    sendVerificationEmail(user.email, user.verificationToken)
        .catch(err => console.error('Background email error:', err));
    
    res.send(_.pick(user, ['_id','username', 'email']));
};

module.exports = {
    getAllUsers,
    getCurrentUser,
    postUser
}
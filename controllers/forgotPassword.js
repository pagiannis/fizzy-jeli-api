const crypto = require('crypto');
const User = require('../models/User');
const { sendResetPasswordEmail } = require('../services/emailService');

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required.'});

    const user = await User.findOne({ email });
    if (user){
        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15 mins
        await user.save();

        await sendResetPasswordEmail(user.email, token);
    }

    return res.status(200).json({
        message: 'If the email is associated with an account, a reset link has been sent.',
    });
};

module.exports = {
    forgotPassword,
}
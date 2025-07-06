const crypto = require('crypto');
const User = require('../models/User');
const { sendResetPasswordEmail } = require('../services/emailService');
const bcrypt = require('bcrypt');

const sendResetCode = async (req, res) => {
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

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required.' });
    }

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password has been reset successfully.' });
};

module.exports = {
    sendResetCode,
    resetPassword,
}
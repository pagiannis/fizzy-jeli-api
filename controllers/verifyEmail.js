const User = require('../models/User');

const updateUserVerificationStatus = async (req, res) => {
    const { token, email } = req.body;

    const user = await User.findOne({
        email,
        verificationToken: token,
        verificationTokenExpiry: { $gt: Date.now() },   
    });

    if (!user) return res.status(400).send('Invalid or expired token.');

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.send({ user });
}

module.exports = {
    updateUserVerificationStatus
};
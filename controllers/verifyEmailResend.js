const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../services/emailService');
const User = require('../models/User');

const verifyEmailResend = async (req, res) => {
    const { email } = req.body;
  
    if (!email) return res.status(400).json({ message: 'Email is required.' });
  
    const user = await User.findOne({ email });
  
    if (!user) return res.status(404).json({ message: 'User not found.' });
  
    if (user.isVerified) {
        return res.status(400).json({ message: 'User is already verified.' });
    }
  
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.EMAIL_VERIFICATION_SECRET,
      { expiresIn: '1h' }
    );
  
    try {
        await sendVerificationEmail(user.email, token);
        return res.status(200).json({ message: 'Verification email sent successfully.' });
    } catch (err) {
        console.error('Email error:', err);
        return res.status(500).json({ message: 'Failed to send email.' });
    }
};
  

module.exports = {
    verifyEmailResend
}
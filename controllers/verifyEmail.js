const User = require('../models/User');
const jwt = require('jsonwebtoken');

const updateUserVerificationStatus = async (req, res) => {
    const token = req.query.token;

    try {
        const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
        const user = await User.findById(decoded.userId);

        if(!user){
            return res.redirect(`${process.env.FRONTEND_URL}/?status=error`);
        }

        if(user.isVerified){
            return res.redirect(`${process.env.FRONTEND_URL}/?status=already`);
        }

        user.isVerified = true;
        await user.save();

        return res.redirect(`${process.env.FRONTEND_URL}/?status=success`);
    } 
    catch (error) {
        return res.redirect(`${process.env.FRONTEND_URL}/?status=error`);
    }
};

module.exports = {
    updateUserVerificationStatus
};
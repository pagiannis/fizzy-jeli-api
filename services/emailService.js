const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    } 
});

const sendVerificationEmail = async (email, token) => {
    const verificationLink = `${process.env.BACKEND_URL}/api/verify-email/?token=${token}`;

    const mailOptions = {
        from: `"Fizzy Jeli" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Email',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color:rgb(214, 49, 170);">Fizzy Jeli Email Verification</h2>
                <p>Hello!</p>
                <p>Please verify your email by clicking below:</p>
                <a href="${verificationLink}" 
                    style="background: rgb(214, 49, 170); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Verify Email
                </a>
                <p style="font-size: 12px; color: #6B7280;">
                    If you didn't request this, please ignore this email.
                </p>
            </div>`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error){
        throw new Error('Failed to send verification email');
    }
};

const sendResetPasswordEmail = async (email, token) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;

    const mailOptions = {
        from: `"Fizzy Jeli" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reset Your Password',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color:rgb(214, 49, 170);">Fizzy Jeli Password Reset</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password. Click the button below to choose a new one:</p>
                <a href="${resetLink}" 
                    style="background: rgb(214, 49, 170); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Reset Password
                </a>
                <p style="font-size: 12px; color: #6B7280;">
                    This link is valid for only 15 minutes. If you didn’t request a password reset, you can safely ignore this email.
                </p>
            </div>`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Failed to send reset password email');
    }
};

module.exports = {
    sendVerificationEmail,
    sendResetPasswordEmail
};
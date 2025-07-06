const express = require('express');
const router = express.Router();
const { sendResetCode } = require('../controllers/forgotPassword');
const { resetPassword } = require('../controllers/forgotPassword');

router.post('/request-reset-code', sendResetCode);

router.patch('/reset-password', resetPassword);

module.exports = router;
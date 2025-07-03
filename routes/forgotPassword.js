const express = require('express');
const router = express.Router();
const { sendResetCode } = require('../controllers/forgotPassword');

router.post('/request-reset-code', sendResetCode);

module.exports = router;
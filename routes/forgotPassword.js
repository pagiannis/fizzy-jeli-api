const express = require('express');
const router = express.Router();
const { sendResetCode } = require('../controllers/forgotPassword');

router.post('/', sendResetCode);

module.exports = router;
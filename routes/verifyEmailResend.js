const { verifyEmailResend } = require('../controllers/verifyEmailResend');
const express = require('express');
const router = express.Router();

router.post('/', verifyEmailResend);

module.exports = router;
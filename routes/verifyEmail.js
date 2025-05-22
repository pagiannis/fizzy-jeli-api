const express = require('express');
const router = express.Router();
const { updateUserVerificationStatus } = require('../controllers/verifyEmail');

router.patch('/', updateUserVerificationStatus);

module.exports = router;
const express = require('express');
const router = express.Router();
const { updateUserVerificationStatus } = require('../controllers/verifyEmail');

router.get('/', updateUserVerificationStatus);

module.exports = router;
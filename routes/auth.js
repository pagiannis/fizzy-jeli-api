const { postAuth } = require('../controllers/auth');
const express = require('express');
const router = express.Router();

router.post('/', postAuth);

module.exports = router;
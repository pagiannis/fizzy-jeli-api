const auth = require('../middleware/auth');
const validateUser = require('../schemas/user.schema');
const validate = require('../middleware/validate');
const { getAllUsers, getCurrentUser, postUser} = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.get('/', getAllUsers);

router.get('/me', auth, getCurrentUser);

router.post('/', validate(validateUser), postUser);

module.exports = router;
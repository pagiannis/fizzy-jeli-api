const validateUser = require('../schemas/user.schema');
const validate = require('../middleware/validate');
const { getAllUsers, postUser} = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.get('/', getAllUsers);

router.post('/', validate(validateUser), postUser);

module.exports = router;
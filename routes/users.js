const User = require('../models/User');
const validateUser = require('../schemas/user.schema');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find().sort({ username: 1 });
    res.send(users);
});

router.post('/', validate(validateUser), async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        favourites: req.body.favourites,
        bag: req.body.bag
    });

    await user.save();
    
    res.send(user);
});

module.exports = router;
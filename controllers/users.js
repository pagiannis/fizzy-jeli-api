const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/User');

const getAllUsers = async (req, res) => {
    const users = await User.find().sort({ username: 1 });
    res.send(users);
};

const postUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['username', 'email', 'password', 'favourites', 'bag']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    await user.save();
    
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','username', 'email', 'favourites', 'bag']));
};

module.exports = {
    getAllUsers,
    postUser
}
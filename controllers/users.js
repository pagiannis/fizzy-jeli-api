const User = require('../models/User');

const getAllUsers = async (req, res) => {
    const users = await User.find().sort({ username: 1 });
    res.send(users);
};

const postUser = async (req, res) => {
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
};

module.exports = {
    getAllUsers,
    postUser
}
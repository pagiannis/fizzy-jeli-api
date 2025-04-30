const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true,
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    bag: [{ 
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: { type: Number, default: 1 }
    }]
});

module.exports = mongoose.model('User', UserSchema);
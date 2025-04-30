const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    bag: [{ 
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: { type: Number, default: 1 }
    }]
});

module.exports = mongoose.model('User', UserSchema);
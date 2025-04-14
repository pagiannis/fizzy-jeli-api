const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    secondaryImage: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['jellies', 'fizzy-drink', 'limited-edition'],
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Product', ProductSchema);
const mongoose = require('mongoose');

const reviewModel = new mongoose.Schema({
    authorID: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        trim: true,
        default: ""
    }
});

module.exports = mongoose.model('Reviews', reviewModel)
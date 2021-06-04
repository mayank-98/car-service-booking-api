const mongoose = require('mongoose');

const serviceCenterSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    carname: {
        type: Array,
        required: true,
        default: []
    },
    model: {
        type: Array,
        required: true,
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Center', serviceCenterSchema)
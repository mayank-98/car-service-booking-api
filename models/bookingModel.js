const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        required: true
    },
    serviceDate: {
        type: Date,
        required: true
    },
    serviceLocation: {
        type: String,
        required: true
    },
    nameOfCar: {
        type: String,
        required: true
    },
    carModel: {
        type: Number,
        required: true
    },
    carMake: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    carClass: {
        type: String,
        required: true
    },
    package: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema)
const Users = require('../models/userModel');
const Center = require('../models/serviceCenterModel');
const Booking = require('../models/bookingModel');

const bookingCtrl = {
    createBooking: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email');
            if (!user) return res.status(400).json({ msg: "User does not exist" });

            const { serviceDate, serviceLocation, nameOfCar, carModel, carMake, carClass, package } = req.body;
            const { _id, name, email } = user;

            const amount = calcAmount({ package, carClass });

            const newBooking = new Booking({
                userID: _id, customer_name: name, customer_email: email, serviceDate,
                serviceLocation, nameOfCar, carModel, carMake, carClass, package, amount
            });

            //if (serviceDate === todaydate) return res.status(400).json({ msg: "Please select a later date." });
            const ser_loc = await Center.findOne({ location: serviceLocation });
            if (!ser_loc) return res.status(400).json({ msg: "Currently we don't have a service center at this location. Sorry for inconvenience" });
            const ser_make = await Center.findOne({ make: carMake });
            if (!ser_make) return res.status(400).json({ msg: "Currently we don't have facilities for this model at the desired location" });

            await newBooking.save();
            res.json({ msg: `Service booked! Total amaount: ${amount}. Have a nice day!` });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getBooking: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email');
            if (!user) return res.status(400).json({ msg: "User does not exist" });

            const f_booking = await Booking.find({ userID: user._id });
            res.json(f_booking);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
    deleteBooking: async (req, res) => {
        try {
            await Booking.findByIdAndDelete(req.params.id);
            res.json({ msg: "Booking deleted" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateBooking: async (req, res) => {
        try {
            const { serviceDate, nameOfCar, carModel, carMake, carClass, package } = req.body;
            const amount = calcAmount({ package, carClass });
            const newBooking = await Booking.findOneAndUpdate({ _id: req.params.id }, { serviceDate, nameOfCar, carModel, carMake, carClass, package, amount });
            if (!newBooking) return res.status(400).json({ msg: "Booking not found" });
            res.json({ msg: `Booking Updated. New Amount: ${amount}.` });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getMenu: async (req, res) => {
        var fs = require('fs');

        try {
            var data = fs.readFileSync('menu.txt', 'utf8');
            console.log(data.toString());
            res.json("check console");
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

const calcAmount = ({ package, carClass }) => {
    let fp;
    let ct;
    if (package === "pro") {
        if (carClass === "hatchback") return 600;
        else if (carClass === 'sedan') return 800;
        else return 1000;
    }
    else if (package === "advanced") {
        if (carClass === "hatchback") return 1200;
        else if (carClass === 'sedan') return 1600;
        else return 2000;
    }
    else if (package === "premium") {
        if (carClass === "hatchback") return 1800;
        else if (carClass === 'sedan') return 2400;
        else return 3000;
    }

}

module.exports = bookingCtrl
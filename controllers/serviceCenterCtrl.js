const Center = require('../models/serviceCenterModel');

const serviceCenterCtrl = {
    getServiceCenter: async (req, res) => {
        try {
            const s_center = await Center.find();
            res.json(s_center);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createServiceCenter: async (req, res) => {
        try {
            const { location, make, carname, model } = req.body;
            const ser_center = await Center.findOne({ location, make });
            if (ser_center) return res.status(400).json({ msg: "A service center already exists for this Make at this location" });

            const newCenter = new Center({ location, make, carname, model });
            await newCenter.save();
            res.json({ msg: "New service center added" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteServiceCenter: async (req, res) => {
        try {
            await Center.findByIdAndDelete(req.params.id);
            res.json({ msg: "Service center deleted" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateServiceCenter: async (req, res) => {
        try {
            const { carname, model } = req.body;
            const myCenter = await Center.findOneAndUpdate({ _id: req.params.id }, { carname, model });
            if (!myCenter) return res.status(400).json({ msg: "No such service center found" });
            res.json({ msg: "Update complete" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = serviceCenterCtrl

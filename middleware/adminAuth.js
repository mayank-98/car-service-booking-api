const Users = require('../models/userModel');

const adminAuth = async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.user.id });
        if (user.role === 0) return res.status(400).json({ msg: "Resource can only be accessed by admin" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
    next();
};

module.exports = adminAuth
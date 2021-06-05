const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, phone, password, city } = req.body;
            const user = await Users.findOne({ email });

            if (user) return res.status(400).json({ msg: "This email already exist" });
            if (password.length < 6) return res.status(400).json({ msg: "Password should be atleast 6 characters long" });
            if (phone.length < 10) return res.status(400).json({ msg: "Phone number should be 10 digits" });

            const passwrodHash = await bcrypt.hash(password, 11);
            const newUser = new Users({
                name, email, phone, password: passwrodHash, city
            });
            await newUser.save();
            res.json("Succesfully Registered");

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if (!user) return res.status(400).json({ msg: "This user does not exists" });
            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(400).json({ msg: "Incorrect password" });

            const accesstoken = createAccessToken({ id: user._id });
            const refreshtoken = createRefreshToken({ id: user._id });

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json(accesstoken);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
            return res.json({ msg: "Logged out" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    refreshToken: (req, res) => {
        try {
            const ref_token = req.cookies.refreshtoken;
            if (!ref_token) return res.status(400).json({ msg: "please login or register" })


            jwt.verify(ref_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(500).json({ msg: "please login or register" })
                const accesstoken = createAccessToken({ id: user.id })
                res.json({ accesstoken })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password');
            if (!user) return res.status(400).json({ msg: "User does not exists" });
            res.json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userCtrl;
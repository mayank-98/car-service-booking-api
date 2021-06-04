const Reviews = require('../models/reviewModel');
const Users = require('../models/userModel');

const reviewCtrl = {
    getReview: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id);
            if (!user) return res.status(400).json({ msg: "User does not exist" });

            const review = await Reviews.find({ authorID: user._id });
            res.json(review);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
    createReview: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id);
            if (!user) return res.status(400).json({ msg: "User does not exist" });

            const { rating, date, content } = req.body;
            const newReview = new Reviews({
                authorID: user._id, author: user.name, rating, date, content
            });
            await newReview.save();
            res.json({ msg: "Review saved" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getReviewAll: async (req, res) => {
        try {
            const reviews = await Reviews.find();
            res.json(reviews);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteReviewAll: async (req, res) => {
        try {
            await Reviews.deleteMany();
            res.json("All reviews deleted")
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteReview: async (req, res) => {
        try {
            await Reviews.findByIdAndDelete(req.params.id);
            res.json({ msg: "Review deleted" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateReview: async (req, res) => {
        try {
            const { rating, content, date } = req.body;
            const reviewupdate = await Reviews.findOneAndUpdate({ _id: req.params.id }, { rating, content, date });
            if (!reviewupdate) return res.status(400).json({ msg: "Review not found" });
            res.json({ msg: "Review updated" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = reviewCtrl
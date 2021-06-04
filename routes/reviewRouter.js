const router = require('express').Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const reviewCtrl = require('../controllers/reviewCtrl');

router.route('/')
    .get(auth, reviewCtrl.getReview)
    .post(auth, reviewCtrl.createReview)

router.route('/:id')
    .delete(auth, reviewCtrl.deleteReview)
    .put(auth, reviewCtrl.updateReview)

router.route('/all')
    .get(auth, reviewCtrl.getReviewAll)
    .delete(auth, adminAuth, reviewCtrl.deleteReviewAll)

module.exports = router    
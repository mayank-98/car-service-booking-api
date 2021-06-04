const router = require('express').Router();
const bookingCtrl = require('../controllers/bookingCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .post(auth, bookingCtrl.createBooking)
    .get(auth, bookingCtrl.getBooking)

router.route('/:id')
    .delete(auth, bookingCtrl.deleteBooking)
    .put(auth, bookingCtrl.updateBooking)

router.get('/menu', bookingCtrl.getMenu)
module.exports = router
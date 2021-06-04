const router = require('express').Router();
const serviceCenterCtrl = require('../controllers/serviceCenterCtrl');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.route('/center')
    .get(serviceCenterCtrl.getServiceCenter)
    .post(auth, adminAuth, serviceCenterCtrl.createServiceCenter)

router.route('/center/:id')
    .delete(auth, adminAuth, serviceCenterCtrl.deleteServiceCenter)
    .put(auth, adminAuth, serviceCenterCtrl.updateServiceCenter)

module.exports = router
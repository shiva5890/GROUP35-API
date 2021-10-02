const router = require('express').Router();
const authenticate = require('./../../../middlewares/authenticate');
const authorize = require('./../../../middlewares/authorize');

const ProudctCtrl = require('./product.controller');

router.route('/')
    .get(ProudctCtrl.get)
    .post(ProudctCtrl.post);

router.route('/search')
    .get(ProudctCtrl.search)
    .post(ProudctCtrl.search);

router.route('/:id')
    .get(ProudctCtrl.getById)
    .put(ProudctCtrl.update)
    .delete(ProudctCtrl.remove);

module.exports = router;

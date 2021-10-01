const router = require('express').Router();
const ReviewCtrl = require('./reviews.controller');
router.route('/')
    .get(ReviewCtrl.get)
    .post(ReviewCtrl.post);

router.route('/:id')
    .get(ReviewCtrl.getById)
    .put(ReviewCtrl.update)
    .delete(ReviewCtrl.remove);


module.exports = router;

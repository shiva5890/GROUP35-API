const ReviewModel = require('./reviews.model');


function get(req, res, next) {
    // for temporary fetch all reviews
    const condition = {};
    // TODO  prepare condition
    ReviewModel
        .find(condition)
        .populate('user',{
            username: 1
        })
        .exec(function (err, reviews) {
            if (err) {
                return next(err);
            }
            res.json(reviews);
        })

}

function getById(req, res, next) {

}

function post(req, res, next) {
    // // validate data
    // // const data = req.body;
    // // data.user = req.user._id;
    // console.log('request body data >>', req.body)

    const newReview = new ReviewModel({});
    newReview.point = req.body.reviewPoint;
    newReview.message = req.body.reviewMessage;
    newReview.user = req.user._id;
    // todo add kasko lagi review ho
    newReview.save(function (err, saved) {
        if (err) {
            return next(err);
        }
        res.json(saved)
    })
}

function update(req, res, next) {

}

function remove(req, res, next) {

}

// object shorthand
module.exports = {
    get: get,
    getById,
    post,
    update,
    remove
}

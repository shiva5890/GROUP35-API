const ProductQuery = require('./product.query')

function get(req, res, next) {
    var condition = {};
    // TODO prepare condition
    ProductQuery
        .find(condition)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

function getById(req, res, next) {

}

function post(req, res, next) {
    const data = req.body;

    res.send('req.body data is >>', req.body)
    // prepare data
    // if(req.file) TODO
    if (req.body.tags)
        data.tags = typeof (req.body.tags) === 'string'
            ? req.body.tags.split(',')
            : req.body.tags;
    if (req.body.offers)
        data.offers = typeof (req.body.offers) === 'string'
            ? req.body.offers.split(',')
            : req.body.offers;
    if (req.body.colors)
        data.colors = typeof (req.body.colors) === 'string'
            ? req.body.colors.split(',')
            : req.body.colors;

    data.vendor = req.user._id;
    ProductQuery
        .insert(data)
        .then(function (response) {
            res.json(response)
        })
        .catch(function (err) {
            next(err);
        })

}

function update(req, res, next) {

}
function remove(req, res, next) {

}
function search(req, res, next) {

}

module.exports = {
    get,
    getById,
    post,
    update,
    remove,
    search
}

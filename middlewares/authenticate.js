const jwt = require('jsonwebtoken');
const config = require('./../configs');

module.exports = function (req, res, next) {
    let token;
    // req willl always have headers
    if (req.headers['authorization'])
        token = req.headers['authorization']
    if (req.headers['x-access-token'])
        token = req.headers['x-access-token']
    if (req.query['token'])
        token = req.query(['token'])

    if (!token) {
        return next({
            msg: "Authentication Failed! Token not provided",
            status: 401
        })
    }
    // console.log('token is >>', token)
    let jwt_token = token.split(' ')[1]
    // token available now verify
    jwt.verify(jwt_token, config.JWT_SECRET, function (err, decoded) {
        if (err) {
            return next(err);
        }
        console.log('token verification successfull', decoded);
        // TODO
        // add logged in user information in request object(req)
        // so that every other middleware will have loggin in user's information
        next(); // proceed to another middleware
    })
}

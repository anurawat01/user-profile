const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.verifyToken = function (req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(401).send({ message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    });
};

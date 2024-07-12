const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' });

        req.user = decoded;
        next();
    });
};

module.exports = auth;
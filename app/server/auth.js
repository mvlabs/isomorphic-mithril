// AUTH
// ==============================================================

const jwt = require('jsonwebtoken');
const jwtUsersAuth = 'bf4d62d9acaf1c7c8dd50976243da07d536bb0ac4146306c33a3d3d766243215767911a0547dd5ee5d3126263c33fbc8a58625810076b4af7de4321d2fa3f46c';


const auth = {};

auth.check = function (req, res, next) {
    const token = req.headers['user-auth-token'];
    jwt.verify(token, jwtUsersAuth, { ignoreNotBefore: true }, (err, decoded) => {
        if (err) {
            res.status(403).send({
                status: 403,
                message: 'Not authorized'
            });
        } else {
            next();
        }
    });
};

auth.login = (req, res) => {
    // Dummy auth check
    const isAuth = req.body.email === 'elijah.scott@example.com' && req.body.password === 'secretpassword';

    if (isAuth) {
        const expiration = Math.floor(3600 + (new Date().getTime() / 1000));

        const token = jwt.sign({
            data: req.body.email
        }, jwtUsersAuth, { expiresIn: '1h' });

        res.send({
            time: expiration,
            token
        });
    } else {
        res.status(401);
        res.send({
            status: 401,
            message: 'Invalid authentication'
        });
    }
};

module.exports = auth;
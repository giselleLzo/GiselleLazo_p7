var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'dfhj84jdwkfur43odmtho5kd0ub7m290tdjti74vjd4rfv7ytfdcc02ser3';

//Exported functions
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}
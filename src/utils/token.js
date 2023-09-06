const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const decryptedToken = async (authHeader) => {
    // Bearer token
    const [, token] = authHeader.split(' ');

    return promisify(jwt.verify)(token, process.env.HASH_BCRYPT);
};

module.exports = {decryptedToken};

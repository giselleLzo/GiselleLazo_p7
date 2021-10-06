const rateLimit = require('express-rate-limit');

//Limiter les requêtes

const limit = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 3,
    message: 'Votre limite de requêtes est dépassé, veuillez attendre'
});

module.exports = {
    ratelimit: limit
};
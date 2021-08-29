const rateLimit = require('express-rate-limit');

//Limiter les requêtes

const limit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2,
    message: 'Votre limite de requêtes est dépassé, veuillez attendre'
});

module.exports = {
    ratelimit: limit
};
'use strict';
const passport = require('passport');
module.exports = {
    passportMiddleware: passport.authenticate('jwt', {session: false})
};

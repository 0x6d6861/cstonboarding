const {Strategy, ExtractJwt} = require('passport-jwt');
require('dotenv').config();
const secret = process.env.SECRET || 'F$v4w84cNX7^-dR6';

const Personnel = require('../models').Personnel;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

module.exports = new Strategy(opts, (payload, done) => {

            Personnel.findOne({
                where: {personnel_id: payload.id}
            }).then(personnel => {

                if (!personnel) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                return done(null, personnel);

            }).catch(err => console.error(err));
        });



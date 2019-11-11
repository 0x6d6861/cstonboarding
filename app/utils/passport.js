const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
require('dotenv').config();


const secret = process.env.SECRET || 'F$v4w84cNX7^-dR6';
const Personnel = require('../models').Personnel;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

// console.log(opts);

// const LocalStrategy = require('passport-local').Strategy;

/*passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {

        //Assume there is a DB module pproviding a global UserModel
        return UserModel.findOne({email, password})
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }

                return cb(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return cb(err);
            });
    }
));*/

passport.use(new Strategy(opts, (payload, done) => {

    return Personnel.findOne({
        where: {personnel_id: payload.id}
    }).then(personnel => {

        if (!personnel) {
            return done(null, false, {message: 'Incorrect username.'});
        }

        return done(null, personnel);

    }).catch(err => console.error(err));
}));

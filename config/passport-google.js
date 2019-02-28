const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const secretKeys = require('./secretKeys');

module.exports = (passport) => {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    console.log('Hi');

    let strategy = new GoogleStrategy({
            clientID: secretKeys.googleAuth.client_id,
            clientSecret: secretKeys.googleAuth.client_secret,
            callbackURL: secretKeys.googleAuth.client_callback,
        },
        function(accessToken, refreshToken, profile, done) {
        console.log(profile);
            User.findOne({id: profile.id}, (err, user) => {
                if(err) return done(err);

                if (user) {
                    return done(null, user);
                } else {
                    // let newUser = new User();
                    // newUser.id = profile.id;
                    // newUser.email = profile.displayName;
                    // newUser.avatar = profile.photos;
                    // newUser.skills = {};
                    // newUser.questionsActive = [];
                    //
                    // newUser.save((err) => {
                    //     if(err) return done(err);
                    //     return done(null, profile);
                    // })
                    return done(null, profile);
                }
            });
        }
    );

    passport.use(strategy);
};


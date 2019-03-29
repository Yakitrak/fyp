const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportRefreshToken = require('passport-oauth2-refresh');
const User = require('../models/userSchema');
const secretKeys = require('./secretKeys');
const mongooseHelper = require('../helpers/mongoose');

module.exports = (passport) => {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    let strategy = new GoogleStrategy({
            clientID: secretKeys.googleAuth.client_id,
            clientSecret: secretKeys.googleAuth.client_secret,
            callbackURL: secretKeys.googleAuth.client_callback,
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({id: profile.id}, (err, user) => {
                if(err) return done(err);
                if (user) {
                    return done(null, user);
                } else {

                    // get beginner questions
                    mongooseHelper('get_start_questions', {}, resp => {
                        if (resp.success) {
                            let newUser = new User();
                            newUser.id = profile.id;
                            newUser.email = profile.emails[0].value;
                            newUser.name = profile.displayName;
                            newUser.avatar = profile.photos[0].value;
                            newUser.skills = {};
                            newUser.questionsActive = resp.data;
                            newUser.google.access_token = accessToken;
                            newUser.google.refresh_token = refreshToken;

                            newUser.save((err) => {
                                if(err) return done(err);
                                return done(null, profile);
                            })
                        } else {
                            console.log('Cant grab starter questions');
                        }
                    });



                }
            });
        }
    );

    passport.use(strategy);
    passportRefreshToken.use(strategy);
};


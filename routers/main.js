'use strict';

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/welcome');
};

module.exports = function (passport) {
    return {
        setRouting: function (router) {
            router.get('/welcome', this.welcome);
            router.get('/question/*', this.index);

            router.get('/auth/google', this.googleAuth);
            router.get('/google_callback', this.googleAuthCallback, this.googleAuthSuccess);
        },


        // google passport
        googleAuthSuccess: function (req, res) {
            res.redirect('/');
        },

        googleAuth: passport.authenticate('google', {
            scope: ['profile'],
        }),

        googleAuthCallback: passport.authenticate('google', {
            failureRedirect: '/welcome',
            failureFlash: true,
        }),

        // custom redirects
        welcome: function(req, res) {
            res.render('index/indexWelcome.ejs', {title: 'Welcome - Parsons Problem'});
        },
        index: function(req, res) {
            res.render('index/indexDashboard.ejs', {title: 'Parsons Problem'});
        },
    }
};



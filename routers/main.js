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
            // application
            router.get('/', ensureAuthenticated, this.loggedIn);
            router.get('/welcome', this.welcome);
            router.get('/logout', this.logout);

            // google
            router.get('/auth/google', this.googleAuth);
            router.get('/auth/google/callback', this.googleAuthCallback, this.googleAuthSuccess);
        },

        // application
        welcome: function(req, res) {
            res.render('index/indexWelcome.ejs', {title: 'PyParson'});
        },

        loggedIn: function (req, res) {
            res.render('index/indexDashboard.ejs', {title: 'PyParson'});
        },

        logout: function(req, res){
            req.logout();
            res.redirect('/welcome');
        },

        // google passport
        googleAuthSuccess: function (req, res) {
            res.redirect('/');
        },

        googleAuth: passport.authenticate('google', {
            scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email'],
        }),

        googleAuthCallback: passport.authenticate('google', {
            failureRedirect: '/welcome',
            failureFlash: true,
        }),

    }
};


